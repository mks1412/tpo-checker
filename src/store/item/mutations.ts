import { ItemMutations } from './types'

export const mutations: ItemMutations = {
  setItems: (state, params) => {
    state.items[params.category] = params.items
  },

  updateItem: (state, item) => {
    const category = item.category.slug
    const target = state.items[category].findIndex((v) => v.id === item.id)
    state.items[category].splice(target, 1, item)
  },

  deleteItem: (state, item) => {
    const category = item.category.slug
    const target = state.items[category].findIndex((v) => v.id === item.id)
    state.items[category].splice(target, 1)
  },

  setLoading: (state, loading) => {
    state.loading = loading
  }
}

export default mutations
