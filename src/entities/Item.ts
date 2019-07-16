import { FirestoreDocument } from '@/gateways/FirestoreGateway'

export interface ItemCategory {
  label: string
  slug: string
}

export interface ItemEntity {
  id: string
  name: string
  brand: string
  size: string
  color: string
  memo: string
  purchasedAt: Date
  category: ItemCategory
}

export interface ItemDocument extends FirestoreDocument {
  name: string
  brand: string
  size: string
  color: string
  memo: string
  purchasedAt: Date
  category: ItemCategory
}
