import { ItemActions } from './types'
import ItemsRepository from '@/repositories/ItemsRepository'

export const actions: ItemActions = {
  load: async ({ commit, dispatch, rootGetters }, { category, force }) => {
    dispatch('startLoading')
    try {
      const repository = new ItemsRepository(rootGetters['user/uid'])
      const items = await repository.getByCategory(category)
      commit('setItems', { category, items })
    } catch (e) {
      throw e
    } finally {
      dispatch('endLoading')
    }
  },

  add: async ({ dispatch, rootGetters }, item) => {
    dispatch('startLoading')
    try {
      const repository = new ItemsRepository(rootGetters['user/uid'])
      await repository.add(item)
    } catch (e) {
      throw e
    } finally {
      dispatch('endLoading')
    }
  },

  update: async ({ commit, dispatch, rootGetters }, item) => {
    dispatch('startLoading')
    try {
      const repository = new ItemsRepository(rootGetters['user/uid'])
      await repository.update(item)
      commit('updateItem', item)
    } catch (e) {
      throw e
    } finally {
      dispatch('endLoading')
    }
  },

  delete: async ({ commit, dispatch, rootGetters }, item) => {
    dispatch('startLoading')
    try {
      const repository = new ItemsRepository(rootGetters['user/uid'])
      await repository.delete(item.id)
      commit('deleteItem', item)
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
