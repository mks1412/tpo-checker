import { FirestoreDocument } from '@/gateways/FirestoreGateway'
import { SelectableOption } from '@/entities/User'

export interface RequestEntity {
  id: string
  situation: string
  remarks: string
  budgetMax: number | null
  budgetMin: number | null
  fashionType: SelectableOption | null
  status: RequestStatus
}

export interface RequestParams {
  situation: string
  remarks: string
  budgetMax: number | null
  budgetMin: number | null
  fashionType: SelectableOption | null
  status: RequestStatus
}

export interface RequestDocument extends FirestoreDocument {
  situation: string
  remarks: string
  budgetMax: number | null
  budgetMin: number | null
  fashionType: SelectableOption | null
  status: RequestStatus
}

export interface RequestStatus extends SelectableOption {
  value: Status
  label: string
}

export enum Status {
  requested,
  pending,
  archive
}
