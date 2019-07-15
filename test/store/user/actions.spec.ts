import { mockState, mockUserProfile } from './mock'
import { actions } from '@/store/user/actions'
import { UserState, UserActionContext } from '@/store/user/types'
import { initState } from '@/store/user/state'

let actionCxt: UserActionContext
let commit: jest.Mock
let state: UserState

describe('Polls actions', () => {
  beforeEach(() => {
    commit = jest.fn()
    state = mockState()
    actionCxt = {
      state,
      commit,
      dispatch: jest.fn(),
      getters: jest.fn(),
      rootGetters: jest.fn(),
      rootState: {}
    }
  })

  describe('signin', () => {
    beforeEach(async () => {
      await actions.signin(actionCxt, mockUserProfile())
    })

    test('commits "setUser"', () => {
      expect(commit).toHaveBeenCalledTimes(1)
      const commitCall = commit.mock.calls[0]
      const user = mockUserProfile()
      expect(commitCall[1]).toEqual(user)
    })
  })

  describe('signout', () => {
    beforeEach(async () => {
      await actions.signout(actionCxt)
    })

    test('commits "setUser with initState"', () => {
      expect(commit).toHaveBeenCalledTimes(1)

      const commitCall = commit.mock.calls[0]
      const user = initState().profile
      expect(commitCall[1]).toEqual(user)
    })
  })
})
