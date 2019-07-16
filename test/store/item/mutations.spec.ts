import { mockState, MOCK_ITEMS } from './mock'
import { mutations } from '@/store/item/mutations'
import { ItemState } from '@/store/item/types'

let state: ItemState

describe('Item mutations', () => {
  beforeEach(() => {
    state = mockState()
  })

  describe('set items', () => {
    const newItem = MOCK_ITEMS[1]
    test('works', () => {
      mutations.setItems(state, { category: newItem.category.slug, items: [newItem] })
      expect(state.items[newItem.category.slug][0]).toEqual(newItem)
    })
  })

  describe('update item', () => {
    const updatedName = 'updated'
    const item = { ...MOCK_ITEMS[0], name: updatedName }
    test('works', () => {
      mutations.updateItem(state, item)
      expect(state.items[item.category.slug][0].name).toEqual(updatedName)
    })
  })

  describe('delte item', () => {
    const item = MOCK_ITEMS[0]
    test('works', () => {
      mutations.deleteItem(state, item)
      expect(state.items[item.category.slug]).toEqual([])
    })
  })

  describe('set loading', () => {
    test('works', () => {
      mutations.setLoading(state, true)
      expect(state.loading).toEqual(true)
      mutations.setLoading(state, false)
      expect(state.loading).toEqual(false)
    })
  })
})
