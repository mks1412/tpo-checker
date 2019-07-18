import { RequestActions } from './types'
import RequestsRepository from '@/repositories/RequestsRepository'

export const actions: RequestActions = {
  // forceオプションがなければストアは更新しない
  load: async ({ commit, dispatch, rootGetters }, force = true) => {
    if (!force) return
    dispatch('startLoading')
    try {
      const repository = new RequestsRepository(rootGetters['user/uid'])
      const requests = await repository.load()
      commit('setRequests', requests)
    } catch (e) {
      throw e
    } finally {
      dispatch('endLoading')
    }
  },

  add: async ({ dispatch, rootGetters }, item) => {
    dispatch('startLoading')
    try {
      const repository = new RequestsRepository(rootGetters['user/uid'])
      await repository.add(item)
      dispatch('load')
    } catch (e) {
      throw e
    } finally {
      dispatch('endLoading')
    }
  },

  delete: async ({ dispatch, commit, rootGetters }, request) => {
    dispatch('startLoading')
    try {
      const repository = new RequestsRepository(rootGetters['user/uid'])
      await repository.delete(request.id)
      commit('deleteRequest', request)
    } catch (e) {
      throw e
    } finally {
      dispatch('endLoading')
    }
  },

  startLoading: ({ commit }) => {
    commit('setLoading', true)
  },

  endLoading: ({ commit }) => {
    commit('setLoading', false)
  }
}

export default actions
