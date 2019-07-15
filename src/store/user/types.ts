import { ActionTree, ActionContext, MutationTree, GetterTree } from 'vuex'
import { RootState } from '../types'
import { UserProfileEntity, UserParams } from '@/entities/User'

export interface UserState {
  profile: UserProfileEntity
}

export type UserActionContext = ActionContext<UserState, RootState>

export interface UserActions extends ActionTree<UserState, RootState> {
  signup: (ctx: UserActionContext, params: UserParams) => void
  signin: (ctx: UserActionContext, user: UserProfileEntity) => void
  signout: (ctx: UserActionContext) => void
}

export interface UserMutations extends MutationTree<UserState> {
  setUser: (state: UserState, user: UserProfileEntity) => void
  updateUser: (state: UserState, params: UserParams) => void
}

export type UserGetters = GetterTree<UserState, RootState>
