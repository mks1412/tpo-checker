import { SelectableOption } from '~/entities/User'

// 年の選択肢(from-to)
export const YearOptions = (from: number = 1970, to: number = new Date().getFullYear()): SelectableOption[] => {
  return [...Array(to - from + 1).keys()].map((i) => ({
    label: `${i + from} 年`,
    value: i + from
  }))
}

// 月の選択肢(1〜12)
export const MonthOptions = (): SelectableOption[] => {
  return [...Array(12).keys()].map((i) => ({
    label: `${i + 1} 月`,
    value: i + 1
  }))
}
