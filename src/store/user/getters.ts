import { UserGetters, UserState } from './types'
import { Gender } from '~/entities/User'

export const getters: UserGetters = {
  isAuthenticated: (state: UserState): boolean => {
    return !!state.profile.id
  },
  uid: (state: UserState): string => {
    return state.profile.id
  },
  gender: (state: UserState): Gender => {
    return state.profile.gender
  }
}

export default getters
