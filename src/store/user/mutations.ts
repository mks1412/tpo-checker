import { UserMutations } from './types'

export const mutations: UserMutations = {
  setUser: (state, user) => {
    state.profile = user
  },

  updateUser: (state, params) => {
    state.profile = { ...state.profile, ...params }
  }
}

export default mutations
