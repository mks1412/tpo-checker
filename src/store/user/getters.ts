import { UserGetters, UserState } from './types'

export const getters: UserGetters = {
  isAuthenticated: (state: UserState): boolean => {
    return !!state.profile.id
  },
  uid: (state: UserState): string => {
    return state.profile.id
  }
}

export default getters
