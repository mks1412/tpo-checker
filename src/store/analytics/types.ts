import { ActionTree, ActionContext, MutationTree, GetterTree } from 'vuex'
import { RootState } from '../types'
import {
  ItemAnalyticsType,
  BreakdownOfCategoryEntity,
  BreakdownOfColorEntity,
  PurchaseHistoryEntity
} from '@/entities/ItemAnalytics'

export interface ItemAnalyticsState {
  byCategory: {
    entity: BreakdownOfCategoryEntity
    loading: boolean
  }
  byColor: {
    entity: BreakdownOfColorEntity
    loading: boolean
  }
  byPurchasedAt: {
    entity: PurchaseHistoryEntity
    loading: boolean
  }
}

export type ItemAnalyticsActionContext = ActionContext<ItemAnalyticsState, RootState>

export interface ItemAnalyticsActions extends ActionTree<ItemAnalyticsState, RootState> {
  loadByCategory: (ctx: ItemAnalyticsActionContext) => Promise<void>
  loadByColor: (ctx: ItemAnalyticsActionContext) => Promise<void>
  loadByPurchasedAt: (ctx: ItemAnalyticsActionContext, year: number) => Promise<void>
  startLoading: (ctx: ItemAnalyticsActionContext, type: ItemAnalyticsType) => void
  endLoading: (ctx: ItemAnalyticsActionContext, type: ItemAnalyticsType) => void
}

export interface ItemAnalyticsMutations extends MutationTree<ItemAnalyticsState> {
  setBreakDownOfCategory: (state: ItemAnalyticsState, entity: BreakdownOfCategoryEntity) => void
  setBreakDownOfColor: (state: ItemAnalyticsState, entity: BreakdownOfColorEntity) => void
  setPurchaseHistory: (state: ItemAnalyticsState, entity: PurchaseHistoryEntity) => void
  setLoading: (state: ItemAnalyticsState, params: { type: ItemAnalyticsType; loading: boolean }) => void
}

export type ItemAnalyticsGetters = GetterTree<ItemAnalyticsState, RootState>
