export interface SelectableOption {
  label: string
  value: string
}

export interface ItemDocument {
  brand: string
  category: SelectableOption
  color: SelectableOption
  id: string
  image: string
  memo: string
  name: string
  purchasedMonth: number
  purchasedYear: number
  size: string
}

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
