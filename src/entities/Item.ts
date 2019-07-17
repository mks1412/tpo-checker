import { FirestoreDocument } from '@/gateways/FirestoreGateway'
import { SelectableOption } from '@/entities/User'

export interface ItemEntity {
  id: string
  name: string
  brand: string
  size: string
  color: string
  memo: string
  purchasedAt: Date
  category: SelectableOption
  subcategory: SelectableOption
}

export interface ItemDocument extends FirestoreDocument {
  name: string
  brand: string
  size: string
  color: string
  memo: string
  purchasedAt: Date
  category: SelectableOption
  subcategory: SelectableOption
}
