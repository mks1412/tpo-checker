import { UserState } from './types'
import { Gender } from '@/entities/User'

export const initState = (): UserState => ({
  profile: {
    id: '',
    email: '',
    name: '',
    photoURL: '',
    gender: Gender.other,
    age: 20,
    height: null,
    weight: null,
    preferences: []
  }
})

export default initState
