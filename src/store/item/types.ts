import { ActionTree, ActionContext, MutationTree, GetterTree } from 'vuex'
import { RootState } from '../types'
import { ItemEntity } from '@/entities/Item'
import { SelectableOption } from '@/entities/User'

export interface ItemState {
  items: { [key: string]: ItemEntity[] }
  loading: boolean
}

export type ItemActionContext = ActionContext<ItemState, RootState>

export interface ItemActions extends ActionTree<ItemState, RootState> {
  load: (ctx: ItemActionContext, category: SelectableOption) => Promise<void>
  update: (ctx: ItemActionContext, item: ItemEntity) => Promise<void>
  delete: (ctx: ItemActionContext, item: ItemEntity) => Promise<void>
  startLoading: (ctx: ItemActionContext) => void
  endLoading: (ctx: ItemActionContext) => void
}

export interface ItemMutations extends MutationTree<ItemState> {
  setItems: (state: ItemState, params: { category: string; items: ItemEntity[] }) => void
  updateItem: (state: ItemState, item: ItemEntity) => void
  deleteItem: (state: ItemState, item: ItemEntity) => void
  setLoading: (state: ItemState, loading: boolean) => void
}

export type ItemGetters = GetterTree<ItemState, RootState>
