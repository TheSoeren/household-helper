import Option from '@/models/Option'
import WeekOfMonth from '@/enums/WeekOfMonth'

const weeksOfMonth: Option[] = [
  { value: WeekOfMonth.FIRST, label: 'First' },
  { value: WeekOfMonth.SECOND, label: 'Second' },
  { value: WeekOfMonth.THIRD, label: 'Third' },
  { value: WeekOfMonth.FOURTH, label: 'Fourth' },
  { value: WeekOfMonth.LAST, label: 'Last' },
]

export default weeksOfMonth
