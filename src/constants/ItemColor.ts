import { SelectableOption } from '@/entities/User'

const colors: SelectableOption[] = [
  {
    label: 'ホワイト',
    value: '#fbfbfb'
  },
  {
    label: 'ブラック',
    value: '#2b2b2b'
  },
  {
    label: 'グレー',
    value: '#9e9d9e'
  },
  {
    label: 'ネイビー',
    value: '#203058'
  },
  {
    label: 'ブラウン',
    value: '#74341f'
  },
  {
    label: 'ベージュ',
    value: '#e5d7ad'
  },
  {
    label: 'グリーン',
    value: '#2b994a'
  },
  {
    label: 'ブルー',
    value: '#0465e4'
  },
  {
    label: 'イエロー',
    value: '#f6e642'
  },
  {
    label: 'ピンク',
    value: '#f6b1d7'
  },
  {
    label: 'レッド',
    value: '#d90327'
  },
  {
    label: 'その他',
    value: 'other'
  }
]

export const ItemColors = (): SelectableOption[] => colors
