import { initState } from '@/store/item/state'

describe('Item state', () => {
  describe('initState', () => {
    test('works', () => {
      const state = initState()
      expect(state.items).toEqual({})
      expect(state.loading).toBeFalsy()
    })
  })
})
