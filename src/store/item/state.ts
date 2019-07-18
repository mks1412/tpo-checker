import { ItemState } from './types'

export const initState = (): ItemState => ({
  items: {},
  loading: false
})

export default initState
