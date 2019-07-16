import { ItemActions } from './types'
import ItemsRepository from '@/repositories/ItemsRepository'

export const actions: ItemActions = {
  load: async ({ commit }, category) => {
    const repository = new ItemsRepository()
    const items = await repository.getByCategory(category)
    commit('setItems', items)
  },

  update: async ({ commit }, item) => {
    const repository = new ItemsRepository()
    await repository.update(item)
    commit('updateItems', item)
  },

  delete: async ({ commit }, item) => {
    const repository = new ItemsRepository()
    await repository.delete(item.id)
    commit('deleteItems', item)
  },

  startLoading: ({ commit }) => {
    commit('setLoading', true)
  },

  endLoading: ({ commit }) => {
    commit('setLoading', false)
  }
}

export default actions
