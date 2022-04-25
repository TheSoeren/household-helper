import MonthlyRepetitionType from '@/enums/MonthlyRepetitionType'
import Option from '@/models/Option'

const monthlyRepetitionType: Option[] = [
  { value: MonthlyRepetitionType.DAY, label: 'On specific day of month' },
  { value: MonthlyRepetitionType.REGULARITY, label: 'On regularity of month' },
]

export default monthlyRepetitionType
