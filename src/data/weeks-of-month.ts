import Option from '@/models/Option'
import WeekOfMonth from '@/enums/WeekOfMonth'

const weeksOfMonth: Option[] = [
  { value: WeekOfMonth.FIRST, label: 'month.week-of-month.first' },
  { value: WeekOfMonth.SECOND, label: 'month.week-of-month.second' },
  { value: WeekOfMonth.THIRD, label: 'month.week-of-month.third' },
  { value: WeekOfMonth.FOURTH, label: 'month.week-of-month.fourth' },
  { value: WeekOfMonth.LAST, label: 'month.week-of-month.last' },
]

export default weeksOfMonth
