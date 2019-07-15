import { UserActions } from './types'
import { initState } from './state'

export const actions: UserActions = {
  signin: ({ commit }, user) => {
    commit('setUser', user)
  },

  signout: ({ commit }) => {
    commit('setUser', initState().profile)
  },

  signup: ({ commit }, params) => {
    commit('updateUser', params)
  }
}

export default actions
