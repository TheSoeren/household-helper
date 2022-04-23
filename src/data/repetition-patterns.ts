import Frequency from '@/enums/Frequency'
import Option from '@/models/Option'

const repetitionPatterns: Option[] = [
  { value: Frequency.NONE, label: 'None' },
  { value: Frequency.DAILY, label: 'Daily' },
  { value: Frequency.WEEKLY, label: 'Weekly' },
  { value: Frequency.MONTHLY, label: 'Monthly' },
  { value: Frequency.YEARLY, label: 'Yearly' },
]

export default repetitionPatterns
