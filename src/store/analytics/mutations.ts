import { ItemAnalyticsMutations } from './types'
import { ItemAnalyticsType } from '@/entities/ItemAnalytics'

export const mutations: ItemAnalyticsMutations = {
  setBreakDownOfCategory: (state, entity) => {
    state.byCategory.entity = entity
  },

  setBreakDownOfColor: (state, entity) => {
    state.byColor.entity = entity
  },

  setPurchaseHistory: (state, entity) => {
    state.byPurchasedAt.entity = entity
  },

  setLoading: (state, params) => {
    switch (params.type) {
      case ItemAnalyticsType.byCategory:
        state.byCategory.loading = params.loading
        break
      case ItemAnalyticsType.byColor:
        state.byColor.loading = params.loading
        break
      case ItemAnalyticsType.byPurchasedAt:
        state.byPurchasedAt.loading = params.loading
        break
      default:
        break
    }
  }
}

export default mutations
