import { RequestState } from './types'

export const initState = (): RequestState => ({
  requests: [],
  loading: false
})

export default initState
