export interface UserProfileEntity {
  id: string
  email: string
  name: string
  photoURL: string
  gender: Gender
  age: number
  height: number | null
  weight: number | null
  preferences: number[]
}

export interface UserParams {
  id?: string
  email?: string
  name?: string
  photoURL?: string
  gender?: Gender
  age?: number
  height?: number | null
  weight?: number | null
  preferences?: number[]
}

export enum Gender {
  male,
  female,
  other
}
