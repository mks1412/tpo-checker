import { UserGetters, UserState } from './types'
import { Gender } from '~/entities/User'

export const getters: UserGetters = {
  isAuthenticated: (state: UserState): boolean => {
    return !!state.fbdata.id
  },
  uid: (state: UserState): string => {
    return state.fbdata.id
  },
  gender: (state: UserState): Gender => {
    return state.profile.gender
  }
}

export default getters
