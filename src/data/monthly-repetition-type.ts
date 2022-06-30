import MonthlyRepetitionType from '@/enums/MonthlyRepetitionType'
import Option from '@/models/Option'

const monthlyRepetitionType: Option[] = [
  { value: MonthlyRepetitionType.DAY, label: 'specific-day-of-month' },
  { value: MonthlyRepetitionType.REGULARITY, label: 'regularity-of-month' },
]

export default monthlyRepetitionType
