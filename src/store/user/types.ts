import { ActionTree, ActionContext, MutationTree, GetterTree } from 'vuex'
import { RootState } from '../types'
import { UserProfileEntity, UserParams } from '@/entities/User'

export interface UserState {
  profile: UserProfileEntity
  loading: boolean
}
export type UserActionContext = ActionContext<UserState, RootState>

export interface UserActions extends ActionTree<UserState, RootState> {
  signup: (ctx: UserActionContext, params: UserProfileEntity) => void
  signin: (ctx: UserActionContext, user: firebase.User) => void
  signout: (ctx: UserActionContext) => void
  update: (ctx: UserActionContext, params: UserProfileEntity) => void
  load: (ctx: UserActionContext, id: string) => void
  startLoading: (ctx: UserActionContext) => void
  endLoading: (ctx: UserActionContext) => void
}

export interface UserMutations extends MutationTree<UserState> {
  setUser: (state: UserState, user: UserProfileEntity) => void
  updateUser: (state: UserState, params: UserParams) => void
  setLoading: (state: UserState, loading: boolean) => void
}

export type UserGetters = GetterTree<UserState, RootState>
