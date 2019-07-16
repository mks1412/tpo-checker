import { UserActions } from './types'
import { initState } from './state'
import { auth } from '@/lib/firebase'
import UsersRepository from '~/repositories/UsersRepository'

const repository = new UsersRepository()

export const actions: UserActions = {
  signup: async ({ commit, state }, params) => {
    commit('updateUser', params)
    try {
      await repository.setProfile(state.profile.id, { ...state.profile, ...params })
    } catch (e) {
      console.log(e)
    }
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
