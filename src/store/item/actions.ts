import { ItemActions } from './types'
import ItemsRepository from '@/repositories/ItemsRepository'

export const actions: ItemActions = {
  // forceオプションがなければストアは更新しない
  load: async ({ commit, state, rootGetters }, { category, force }) => {
    if (state.items[category] && !force) return
    const repository = new ItemsRepository(rootGetters['user/uid'])
    const items = await repository.getByCategory(category)
    console.log(items)
    commit('setItems', { category, items })
  },

  add: async ({ commit, rootGetters }, item) => {
    const repository = new ItemsRepository(rootGetters['user/uid'])
    await repository.add(item)
  },

  update: async ({ commit, rootGetters }, item) => {
    const repository = new ItemsRepository(rootGetters['user/uid'])
    await repository.update(item)
    commit('updateItem', item)
  },

  delete: async ({ commit, rootGetters }, item) => {
    const repository = new ItemsRepository(rootGetters['user/uid'])
    await repository.delete(item.id)
    commit('deleteItem', item)
  },

  startLoading: ({ commit }) => {
    commit('setLoading', true)
  },

  endLoading: ({ commit }) => {
    commit('setLoading', false)
  }
}

export default actions
