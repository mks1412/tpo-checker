import { UserActions } from './types'
import { initState } from './state'
import { auth } from '@/lib/firebase'
import UsersRepository from '~/repositories/UsersRepository'

const repository = new UsersRepository()

export const actions: UserActions = {
  signup: async ({ commit }, params) => {
    commit('setFirebaseUserData', { id: params.id, email: params.email })
    commit('updateUser', params)
    await repository.setProfile(params.id, params)
  },

  signin: ({ commit }, user) => {
    commit('setFirebaseUserData', { id: user.uid, email: user.email })
  },

  signout: ({ commit }) => {
    auth.signOut().then(() => {
      commit('setUser', initState().profile)
    })
  },

  update: async ({ commit }, params) => {
    commit('updateUser', params)
    await repository.setProfile(params.id, params)
  },

  load: async ({ commit, rootGetters }) => {
    const profile = await repository.getProfileById(rootGetters['user/uid'])
    commit('updateUser', profile)
  },

  startLoading: ({ commit }) => {
    commit('setLoading', true)
  },

  endLoading: ({ commit }) => {
    commit('setLoading', false)
  }
}

export default actions
