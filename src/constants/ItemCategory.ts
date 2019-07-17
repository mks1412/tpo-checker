import { Gender, SelectableOption } from '@/entities/User'

const UnisexCategories: SelectableOption[] = [
  {
    label: 'トップス',
    value: 'tops'
  },
  {
    label: 'アウター',
    value: 'outer'
  },
  {
    label: 'パンツ',
    value: 'pants'
  },
  {
    label: 'オールインワン',
    value: 'all_in_one'
  },
  {
    label: 'バッグ',
    value: 'bag'
  },
  {
    label: 'シューズ',
    value: 'shoes'
  },
  {
    label: '財布/小物',
    value: 'wallet'
  },
  {
    label: '時計',
    value: 'watch'
  },
  {
    label: 'アクセサリー',
    value: 'accessory'
  },
  {
    label: '帽子',
    value: 'hat'
  }
]

const MensCategories: SelectableOption[] = [
  ...UnisexCategories,
  {
    label: 'スーツ/タイ',
    value: 'suits'
  }
]

const WomensCategories: SelectableOption[] = [
  ...UnisexCategories,
  {
    label: 'スカート',
    value: 'skirt'
  },
  {
    label: 'ワンピース',
    value: 'dress'
  },

  {
    label: 'ヘアアクセサリー',
    value: 'hair_accessory'
  }
]

export const ItemCategories = (gender: Gender | null): SelectableOption[] =>
  gender === Gender.male ? MensCategories : WomensCategories
