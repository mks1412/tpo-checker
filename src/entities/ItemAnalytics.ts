export enum ItemAnalyticsType {
  byCategory = 'byCategory',
  byColor = 'byColor',
  byPurchasedAt = 'byPurchasedAt'
}

export interface ItemAnalyticsEntity {
  type: ItemAnalyticsType
}

export interface AnalyticsData {
  name: string
  y: number
}

export interface BreakdownOfCategoryEntity extends ItemAnalyticsEntity {
  data: AnalyticsData[]
}

export interface BreakdownOfColorEntity extends ItemAnalyticsEntity {
  data: AnalyticsData[]
  colors: string[]
}

export interface PurchaseHistoryEntity extends ItemAnalyticsEntity {
  data: number[]
  year: number
}
