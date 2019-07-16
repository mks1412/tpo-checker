import { Gender } from '@/entities/User'
import { ItemCategory } from '@/entities/Item'

const UnisexCategories: ItemCategory[] = [
  {
    label: 'トップス',
    slug: 'tops'
  },
  {
    label: 'アウター',
    slug: 'outer'
  },
  {
    label: 'パンツ',
    slug: 'pants'
  },
  {
    label: 'オールインワン',
    slug: 'all_in_one'
  },
  {
    label: 'バッグ',
    slug: 'bag'
  },
  {
    label: 'シューズ',
    slug: 'shoes'
  },
  {
    label: '財布/小物',
    slug: 'wallet'
  },
  {
    label: '時計',
    slug: 'watch'
  },
  {
    label: 'アクセサリー',
    slug: 'accessory'
  },
  {
    label: '帽子',
    slug: 'hat'
  }
]

const MensCategories: ItemCategory[] = [
  ...UnisexCategories,
  {
    label: 'スーツ/タイ',
    slug: 'suits'
  }
]

const WomensCategories: ItemCategory[] = [
  ...UnisexCategories,
  {
    label: 'スカート',
    slug: 'skirt'
  },
  {
    label: 'ワンピース',
    slug: 'skirt'
  },

  {
    label: 'ヘアアクセサリー',
    slug: 'hair_accessory'
  }
]

export const ItemCategories = (gender: Gender): ItemCategory[] =>
  gender === Gender.male ? MensCategories : WomensCategories
