import { UserState } from '@/store/user/types'
import { UserProfileEntity, Gender } from '@/entities/User'

const MOCK_USERS: UserProfileEntity[] = [
  {
    id: 'c69pDJdoyKNRUTvwi90i6Hv9g6b2',
    email: 'hogehoge@gmail.com',
    name: 'hoge',
    photoURL: '',
    gender: Gender.male,
    age: 22,
    height: 178,
    weight: 65,
    preferences: [1, 2, 3, 5]
  },
  {
    id: 'I50mrCyIoAPwJje5UF4SD8IUcgn2',
    email: 'fuga@gmail.com',
    name: 'fuga',
    photoURL: '',
    gender: Gender.female,
    age: 35,
    height: 158,
    weight: 45,
    preferences: [0, 2, 4]
  }
]

export const mockUserProfile = (index: number = 0): UserProfileEntity => {
  return MOCK_USERS[index]
}

export const mockState = (index: number = 0): UserState => {
  return {
    fbdata: { email: '', id: '' },
    profile: mockUserProfile(index),
    loading: false
  }
}
