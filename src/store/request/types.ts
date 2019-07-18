import { ActionTree, ActionContext, MutationTree, GetterTree } from 'vuex'
import { RootState } from '../types'
import { RequestEntity, RequestParams } from '@/entities/Request'

export interface RequestState {
  requests: RequestEntity[]
  loading: boolean
}

export type RequestActionContext = ActionContext<RequestState, RootState>

export interface RequestActions extends ActionTree<RequestState, RootState> {
  load: (ctx: RequestActionContext, force?: boolean) => Promise<void>
  add: (ctx: RequestActionContext, request: RequestParams) => Promise<void>
  delete: (ctx: RequestActionContext, request: RequestEntity) => Promise<void>
  startLoading: (ctx: RequestActionContext) => void
  endLoading: (ctx: RequestActionContext) => void
}

export interface RequestMutations extends MutationTree<RequestState> {
  setRequests: (state: RequestState, requests: RequestEntity[]) => void
  deleteRequest: (state: RequestState, request: RequestEntity) => void
  setLoading: (state: RequestState, loading: boolean) => void
}

export type RequestGetters = GetterTree<RequestState, RootState>
