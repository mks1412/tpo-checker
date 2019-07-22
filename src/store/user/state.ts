import { UserState } from './types'
import { Gender } from '@/entities/User'

export const initState = (): UserState => ({
  fbdata: {
    id: '',
    email: ''
  },
  profile: {
    id: '',
    email: '',
    name: '',
    photoURL: '',
    gender: Gender.other,
    age: null,
    height: null,
    weight: null,
    preferences: []
  },
  loading: false
})

export default initState
