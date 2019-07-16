import { UserMutations } from './types'

export const mutations: UserMutations = {
  setUser: (state, user) => {
    state.profile = user
  },

  updateUser: (state, params) => {
    state.profile = { ...state.profile, ...params }
  },

  setLoading: (state, loading) => {
    state.loading = loading
  }
}

export default mutations
