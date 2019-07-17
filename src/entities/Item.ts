import { FirestoreDocument } from '@/gateways/FirestoreGateway'
import { SelectableOption } from '@/entities/User'

export interface ItemEntity {
  id: string
  name: string
  brand: string
  size: string
  color: string
  memo: string
  image: string
  purchasedYear: number | null
  purchasedMonth: number | null
  category: SelectableOption
  subcategory: SelectableOption
}

export interface ItemParams {
  name: string
  brand: string
  size: string
  color: string
  memo: string
  image: string
  purchasedYear: number | null
  purchasedMonth: number | null
  category: SelectableOption | null
  subcategory: SelectableOption | null
}

export interface ItemDocument extends FirestoreDocument {
  name: string
  brand: string
  size: string
  color: string
  memo: string
  image: string
  purchasedYear: number | null
  purchasedMonth: number | null
  category: SelectableOption
  subcategory: SelectableOption
}
