import { Gender, SelectableOption } from '@/entities/User'

const UnisexTypes: SelectableOption[] = [
  { label: 'カジュアル', value: 'casual' },
  { label: 'きれいめ', value: 'kirei' },
  { label: 'キレカジ', value: 'kirekaji' },
  { label: 'モード', value: 'mode' },
  { label: 'アメカジ', value: 'amekaji' },
  { label: 'ストリート', value: 'street' },
  { label: '裏原系', value: 'urahara' },
  { label: 'フォーマル', value: 'formal' },
  { label: 'エスニック', value: 'ethnic' },
  { label: 'B系', value: 'b-type' }
]

const MensTypes: SelectableOption[] = [
  ...UnisexTypes,
  { label: 'お兄系', value: 'brother' },
  { label: 'サロン系', value: 'salon' }
]

const WomensTypes: SelectableOption[] = [
  ...UnisexTypes,
  { label: 'お姉系', value: 'sister' },
  { label: 'ギャル', value: 'gyaru' },
  { label: 'フェミニン', value: 'feminine' },
  { label: '姫系', value: 'princess' }
]

export const FashionTypes = (gender: Gender | null): SelectableOption[] =>
  gender === Gender.male ? MensTypes : WomensTypes
