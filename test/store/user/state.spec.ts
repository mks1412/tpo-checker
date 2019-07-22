import { initState } from '@/store/user/state'
import { Gender } from '@/entities/User'

describe('User state', () => {
  describe('initState', () => {
    test('works', () => {
      const state = initState()
      expect(state.fbdata.id).toEqual('')
      expect(state.fbdata.email).toEqual('')
      expect(state.profile.id).toEqual('')
      expect(state.profile.email).toEqual('')
      expect(state.profile.name).toEqual('')
      expect(state.profile.photoURL).toEqual('')
      expect(state.profile.gender).toEqual(Gender.other)
      expect(state.profile.age).toBeNull()
      expect(state.profile.height).toBeNull()
      expect(state.profile.weight).toBeNull()
      expect(state.profile.preferences).toEqual([])
      expect(state.loading).toBeFalsy()
    })
  })
})
