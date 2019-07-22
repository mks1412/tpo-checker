import { ItemAnalyticsState } from './types'
import { ItemAnalyticsType } from '@/entities/ItemAnalytics'

export const initState = (): ItemAnalyticsState => ({
  byCategory: {
    loading: false,
    entity: {
      data: [],
      type: ItemAnalyticsType.byCategory
    }
  },
  byColor: {
    loading: false,
    entity: {
      data: [],
      colors: [],
      type: ItemAnalyticsType.byColor
    }
  },
  byPurchasedAt: {
    loading: false,
    entity: {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      year: new Date().getFullYear(),
      type: ItemAnalyticsType.byPurchasedAt
    }
  }
})

export default initState
