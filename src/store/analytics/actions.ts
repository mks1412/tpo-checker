import { ItemAnalyticsActions } from './types'
import initState from './state'
import ItemAnalyticsRepository from '@/repositories/ItemAnalyticsRepository'
import {
  ItemAnalyticsType,
  BreakdownOfCategoryEntity,
  BreakdownOfColorEntity,
  PurchaseHistoryEntity
} from '@/entities/ItemAnalytics'
import { Operators } from '@/gateways/FirestoreGateway'

export const actions: ItemAnalyticsActions = {
  loadByCategory: async ({ commit, dispatch, rootGetters }) => {
    const type = ItemAnalyticsType.byCategory
    dispatch('startLoading', type)
    try {
      const repository = new ItemAnalyticsRepository<BreakdownOfCategoryEntity>(rootGetters['user/uid'], type)
      const entity = await repository.get()
      if (entity) commit('setBreakDownOfCategory', entity)
    } catch (e) {
      throw e
    } finally {
      dispatch('endLoading', type)
    }
  },

  loadByColor: async ({ commit, dispatch, rootGetters }) => {
    const type = ItemAnalyticsType.byColor
    dispatch('startLoading', type)
    try {
      const repository = new ItemAnalyticsRepository<BreakdownOfColorEntity>(rootGetters['user/uid'], type)
      const entity = await repository.get()
      if (entity) commit('setBreakDownOfColor', entity)
    } catch (e) {
      throw e
    } finally {
      dispatch('endLoading', type)
    }
  },

  loadByPurchasedAt: async ({ commit, dispatch, rootGetters }, year) => {
    const type = ItemAnalyticsType.byPurchasedAt
    dispatch('startLoading', type)
    try {
      const repository = new ItemAnalyticsRepository<PurchaseHistoryEntity>(rootGetters['user/uid'], type)
      const entity = await repository.get({ field: 'year', operator: Operators.Equal, value: year })
      commit('setPurchaseHistory', entity || { data: initState().byPurchasedAt.entity.data, year })
    } catch (e) {
      throw e
    } finally {
      dispatch('endLoading', type)
    }
  },

  startLoading: ({ commit }, type) => {
    commit('setLoading', { type, loading: true })
  },

  endLoading: ({ commit }, type) => {
    commit('setLoading', { type, loading: false })
  }
}

export default actions
