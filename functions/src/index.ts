import * as functions from 'firebase-functions'
import * as firebaseAdmin from 'firebase-admin'
import {
  ItemDocument,
  BreakdownOfCategoryEntity,
  BreakdownOfColorEntity,
  ItemAnalyticsType,
  PurchaseHistoryEntity
} from './entity'

firebaseAdmin.initializeApp()
const db = firebaseAdmin.firestore()
const settings = { timestampsInSnapshots: true }
db.settings(settings)

exports.onItemCreated = functions
  .region('asia-northeast1')
  .firestore.document('users/{userId}/items/{itemId}')
  .onCreate((snapshot, context) => {
    const item = snapshot.data() as ItemDocument
    const itemAnalyticsRef = db
      .collection('users')
      .doc(context.params.userId)
      .collection('item-analytics')

    db.runTransaction(async (transaction) => {
      const byCategory = await transaction.get(itemAnalyticsRef.where('type', '==', ItemAnalyticsType.byCategory))
      const byColor = await transaction.get(itemAnalyticsRef.where('type', '==', ItemAnalyticsType.byColor))
      const byPurchasedAt = await transaction.get(itemAnalyticsRef.where('type', '==', ItemAnalyticsType.byPurchasedAt))

      // カテゴリ集計データ更新
      if (byCategory.empty) {
        const breakdown: BreakdownOfCategoryEntity = {
          type: ItemAnalyticsType.byCategory,
          data: [{ name: item.category.label, y: 1 }]
        }
        transaction.set(itemAnalyticsRef.doc(), breakdown)
      } else {
        const breakdown = byCategory.docs[0].data() as BreakdownOfCategoryEntity
        const index = breakdown.data.findIndex((c) => c.name === item.category.label)
        if (index !== -1) {
          breakdown.data[index].y = breakdown.data[index].y + 1
        } else {
          breakdown.data.push({ name: item.category.label, y: 1 })
        }
        transaction.set(byCategory.docs[0].ref, breakdown)
      }

      // 色集計データ更新
      if (byColor.empty) {
        const breakdown: BreakdownOfColorEntity = {
          type: ItemAnalyticsType.byColor,
          data: [{ name: item.color.label, y: 1 }],
          colors: [item.color.value]
        }
        transaction.set(itemAnalyticsRef.doc(), breakdown)
      } else {
        const breakdown = byColor.docs[0].data() as BreakdownOfColorEntity
        const index = breakdown.data.findIndex((c) => c.name === item.color.label)
        if (index !== -1) {
          breakdown.data[index].y = breakdown.data[index].y + 1
        } else {
          breakdown.data.push({ name: item.color.label, y: 1 })
          breakdown.colors.push(item.color.value)
        }
        transaction.set(byColor.docs[0].ref, breakdown)
      }

      // 購入時期集計データ更新
      if (byPurchasedAt.empty) {
        const purchaseHistory: PurchaseHistoryEntity = {
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          type: ItemAnalyticsType.byPurchasedAt,
          year: item.purchasedYear
        }
        purchaseHistory.data[item.purchasedMonth - 1] = 1
        transaction.set(itemAnalyticsRef.doc(), purchaseHistory)
      } else {
        const purchaseHistory = byPurchasedAt.docs[0].data() as PurchaseHistoryEntity
        purchaseHistory.data.splice(item.purchasedMonth - 1, 1, purchaseHistory.data[item.purchasedMonth - 1] + 1)
        transaction.set(byPurchasedAt.docs[0].ref, purchaseHistory)
      }
    })
  })

exports.onItemUpdated = functions
  .region('asia-northeast1')
  .firestore.document('users/{userId}/items/{itemId}')
  .onUpdate((change, context) => {
    const newValue = change.after.data() as ItemDocument
    const oldValue = change.before.data() as ItemDocument
    if (!newValue || !oldValue) return
    const categoryChanged = newValue.category.value !== oldValue.category.value
    const colorChanged = newValue.color.value !== oldValue.color.value
    const purchasedAtChanged =
      newValue.purchasedMonth !== oldValue.purchasedMonth || newValue.purchasedYear !== oldValue.purchasedYear
    const itemAnalyticsRef = db
      .collection('users')
      .doc(context.params.userId)
      .collection('item-analytics')

    if (categoryChanged) {
      const byCategoryRef = itemAnalyticsRef.where('type', '==', ItemAnalyticsType.byCategory)
      db.runTransaction((transaction) => {
        return transaction.get(byCategoryRef).then((snapshot) => {
          if (snapshot.empty) {
            const data: BreakdownOfCategoryEntity = {
              type: ItemAnalyticsType.byCategory,
              data: [{ name: newValue.category.label, y: 1 }]
            }
            return transaction.set(itemAnalyticsRef.doc(), data)
          } else {
            const oldBreakdown = snapshot.docs[0].data() as BreakdownOfCategoryEntity
            const newBreakdown: BreakdownOfCategoryEntity = { ...oldBreakdown }

            // 変更前のカテゴリのデクリメント
            const beforeCategoryIndex = oldBreakdown.data.findIndex((c) => c.name === oldValue.category.label)
            const categoryCount = newBreakdown.data[beforeCategoryIndex].y
            if (categoryCount > 1) {
              newBreakdown.data[beforeCategoryIndex].y = categoryCount - 1
            } else {
              newBreakdown.data.splice(beforeCategoryIndex, 1)
            }
            // 変更後のカテゴリのインクリメント or 初期化
            const afterCategoryIndex = oldBreakdown.data.findIndex((c) => c.name === newValue.category.label)
            if (afterCategoryIndex !== -1) {
              newBreakdown.data[afterCategoryIndex].y = newBreakdown.data[afterCategoryIndex].y + 1
            } else {
              newBreakdown.data.push({ name: newValue.category.label, y: 1 })
            }

            return transaction.set(snapshot.docs[0].ref, newBreakdown)
          }
        })
      })
    }

    if (colorChanged) {
      const byColorRef = itemAnalyticsRef.where('type', '==', ItemAnalyticsType.byColor)
      db.runTransaction((transaction) => {
        return transaction.get(byColorRef).then((snapshot) => {
          if (snapshot.empty) {
            const data: BreakdownOfColorEntity = {
              type: ItemAnalyticsType.byCategory,
              data: [{ name: newValue.color.label, y: 1 }],
              colors: [newValue.color.value]
            }
            return transaction.set(itemAnalyticsRef.doc(), data)
          } else {
            const oldBreakdown = snapshot.docs[0].data() as BreakdownOfColorEntity
            const newBreakdown: BreakdownOfColorEntity = { ...oldBreakdown }

            // 変更前の色のデクリメント
            const beforeColorIndex = oldBreakdown.data.findIndex((c) => c.name === oldValue.color.label)
            const colorCount = newBreakdown.data[beforeColorIndex].y
            if (colorCount > 1) {
              newBreakdown.data[beforeColorIndex].y = colorCount - 1
            } else {
              newBreakdown.data.splice(beforeColorIndex, 1)
              newBreakdown.colors.splice(beforeColorIndex, 1)
            }
            // 変更後の色のインクリメント or 初期化
            const afterColorIndex = oldBreakdown.data.findIndex((c) => c.name === newValue.color.label)
            if (afterColorIndex !== -1) {
              newBreakdown.data[beforeColorIndex].y = newBreakdown.data[afterColorIndex].y + 1
            } else {
              newBreakdown.data.push({ name: newValue.category.label, y: 1 })
              newBreakdown.colors.push(newValue.color.value)
            }
            return transaction.set(snapshot.docs[0].ref, newBreakdown)
          }
        })
      })
    }

    if (purchasedAtChanged) {
      const byPurchsedAtRef = itemAnalyticsRef.where('type', '==', ItemAnalyticsType.byPurchasedAt)
      const oldYear = oldValue.purchasedYear
      const oldMonth = oldValue.purchasedMonth
      const newYear = newValue.purchasedYear
      const newMonth = newValue.purchasedMonth

      db.runTransaction(async (transaction) => {
        const oldYearSnapshot = await transaction.get(byPurchsedAtRef.where('year', '==', oldYear))
        const newYearSnapshot = await transaction.get(byPurchsedAtRef.where('year', '==', newYear))

        // 変更前の購入時期集計データのデクリメント
        const oldHistory = oldYearSnapshot.docs[0].data() as PurchaseHistoryEntity
        oldHistory.data[oldMonth - 1] = oldHistory.data[oldMonth - 1] - 1
        transaction.set(oldYearSnapshot.docs[0].ref, oldHistory)

        // 変更後の購入時期集計データのインクリメント or 初期化
        if (newYearSnapshot.empty) {
          const newHistory: PurchaseHistoryEntity = {
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            type: ItemAnalyticsType.byPurchasedAt,
            year: newYear
          }
          newHistory.data.splice(newMonth - 1, 1, 1)
          transaction.set(itemAnalyticsRef.doc(), newHistory)
        } else {
          const newHistory = newYearSnapshot.docs[0].data() as PurchaseHistoryEntity
          newHistory.data.splice(newMonth - 1, 1, newHistory.data[newMonth - 1] + 1)
          transaction.set(newYearSnapshot.docs[0].ref, newHistory)
        }
      })
    }
  })
