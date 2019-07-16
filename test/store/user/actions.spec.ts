import * as firebase from 'firebase'
import { mockState } from './mock'
import { actions } from '@/store/user/actions'
import { UserState, UserActionContext } from '@/store/user/types'
import { initState } from '@/store/user/state'

let actionCxt: UserActionContext
let commit: jest.Mock
let state: UserState

describe('User actions', () => {
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
    beforeEach(() => {
      actions.signin(actionCxt, {
        uid: 'hogehoge',
        displayName: 'testDisplayName',
        email: 'test@test.com',
        photoURL: ''
      } as firebase.User)
    })

    test('commits "setUser"', () => {
      expect(commit).toHaveBeenCalledTimes(1)
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

  describe('startLoading', () => {
    beforeEach(() => {
      actions.startLoading(actionCxt)
    })

    test('commits "setLoading with true"', () => {
      expect(commit).toHaveBeenCalledTimes(1)
      const commitCall = commit.mock.calls[0]
      expect(commitCall[1]).toEqual(true)
    })
  })

  describe('endLoading', () => {
    beforeEach(() => {
      actions.endLoading(actionCxt)
    })

    test('commits "setLoading with false"', () => {
      expect(commit).toHaveBeenCalledTimes(1)
      const commitCall = commit.mock.calls[0]
      expect(commitCall[1]).toEqual(false)
    })
  })
})
