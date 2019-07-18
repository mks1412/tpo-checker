import { RequestMutations } from './types'

export const mutations: RequestMutations = {
  setRequests: (state, requests) => {
    state.requests = requests
  },

  deleteRequest: (state, request) => {
    const target = state.requests.findIndex((v) => v.id === request.id)
    state.requests.splice(target, 1)
  },

  setLoading: (state, loading) => {
    state.loading = loading
  }
}

export default mutations
