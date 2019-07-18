import { mocked } from 'ts-jest/utils'
import { mockState, MOCK_ITEMS } from './mock'
import { actions } from '@/store/item/actions'
import { ItemState, ItemActionContext } from '@/store/item/types'
import { ItemCategories } from '@/constants/ItemCategory'
import { Gender } from '@/entities/User'
import { ItemEntity } from '@/entities/Item'
import ItemsRepository from '~/repositories/ItemsRepository'

let actionCxt: ItemActionContext
let commit: jest.Mock
let state: ItemState
const category = ItemCategories(Gender.male)[0]
let _category: string
let _item: ItemEntity
let _id: string

jest.mock('@/repositories/ItemsRepository')

describe('Item actions', () => {
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

    // mock ItemsRepository
    mocked(ItemsRepository).mockImplementation((): any => {
      return {
        getByCategory: (category: string): Promise<ItemEntity[]> => {
          return new Promise((resolve) => {
            _category = category
            resolve(MOCK_ITEMS)
          })
        },
        update: (item: ItemEntity): Promise<void> => {
          return new Promise((resolve) => {
            _item = item
            resolve()
          })
        },
        delete: (id: string): Promise<void> => {
          return new Promise((resolve) => {
            _id = id
            resolve()
          })
        }
      }
    })
  })

  describe('load', () => {
    beforeEach(async () => {
      await actions.load(actionCxt, { category: category.value as string, force: true })
    })

    test('commits "setItems with response"', () => {
      expect(_category).toEqual(category.value)
      expect(commit).toHaveBeenCalledWith('setItems', { category: category.value, items: MOCK_ITEMS })
    })
  })

  describe('update', () => {
    beforeEach(async () => {
      await actions.update(actionCxt, MOCK_ITEMS[0])
    })

    test('commits "updateItem with response"', () => {
      expect(_item).toEqual(MOCK_ITEMS[0])
      expect(commit).toHaveBeenCalledWith('updateItem', MOCK_ITEMS[0])
    })
  })

  describe('delete', () => {
    beforeEach(async () => {
      await actions.delete(actionCxt, MOCK_ITEMS[0])
    })

    test('commits "deleteItem with response"', () => {
      expect(_id).toEqual(MOCK_ITEMS[0].id)
      expect(commit).toHaveBeenCalledWith('deleteItem', MOCK_ITEMS[0])
    })
  })

  describe('startLoading', () => {
    beforeEach(() => {
      actions.startLoading(actionCxt)
    })

    test('commits "setLoading with true"', () => {
      expect(commit).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledWith('setLoading', true)
    })
  })

  describe('endLoading', () => {
    beforeEach(() => {
      actions.endLoading(actionCxt)
    })

    test('commits "setLoading with false"', () => {
      expect(commit).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledWith('setLoading', false)
    })
  })
})
