import Frequency from '@/enums/Frequency'
import Option from '@/models/Option'

const repetitionPatterns: Option[] = [
  { value: Frequency.NONE, label: 'repetition.none' },
  { value: Frequency.DAILY, label: 'repetition.daily' },
  { value: Frequency.WEEKLY, label: 'repetition.weekly' },
  { value: Frequency.MONTHLY, label: 'repetition.monthly' },
  { value: Frequency.YEARLY, label: 'repetition.yearly' },
]

export default repetitionPatterns
