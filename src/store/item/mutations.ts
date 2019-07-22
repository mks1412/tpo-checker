import { ItemMutations } from './types'

export const mutations: ItemMutations = {
  setItems: (state, params) => {
    state.items[params.category] = params.items
  },

  updateItem: (state, item) => {
    const category = item.category.value
    const targetIndex = state.items[category] && state.items[category].findIndex((v) => v.id === item.id)
    if (targetIndex !== -1) {
      state.items[category].splice(targetIndex, 1, item)
    } else if (state.items[category]) {
      state.items[category].push(item)
    } else {
      state.items[category] = [item]
    }
  },

  deleteItem: (state, item) => {
    const category = item.category.value
    const target = state.items[category].findIndex((v) => v.id === item.id)
    state.items[category].splice(target, 1)
  },

  setLoading: (state, loading) => {
    state.loading = loading
  }
}

export default mutations
