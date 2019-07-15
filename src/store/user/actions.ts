import { UserActions } from './types'
import { initState } from './state'
import { auth } from '@/plugins/firebase'

export const actions: UserActions = {
  signup: ({ commit }, params) => {
    commit('updateUser', params)
  },

  signin: ({ commit }, user) => {
    commit('updateUser', {
      id: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    })
  },

  signout: ({ commit }) => {
    auth.signOut().then(() => {
      commit('setUser', initState().profile)
    })
  }
}

export default actions
