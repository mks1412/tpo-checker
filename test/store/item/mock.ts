import { ItemState } from '@/store/item/types'
import { ItemEntity } from '@/entities/Item'
import { ItemCategories } from '@/constants/ItemCategory'
import { Gender } from '@/entities/User'

const category1 = ItemCategories(Gender.male)[0]
const category2 = ItemCategories(Gender.male)[1]

export const MOCK_ITEMS: ItemEntity[] = [
  {
    id: 'c69pDJdoyKNRUTvwi90i6Hv9g6b2',
    name: 'hoge',
    brand: 'hoge',
    size: 'M',
    color: '#fff',
    category: category1,
    purchasedAt: new Date(),
    memo: 'hoge'
  },
  {
    id: 'UTHv9DJdcyKNR6vwi9g6b2069poi',
    name: 'fuga',
    brand: 'fuga',
    size: 'S',
    color: '#000',
    category: category2,
    purchasedAt: new Date(),
    memo: 'fuga'
  }
]

export const mockState = (): ItemState => {
  return {
    items: {
      [category1.slug]: [MOCK_ITEMS[0]]
    },
    loading: false
  }
}
