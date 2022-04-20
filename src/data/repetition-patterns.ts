import RepetitionPattern from '@/enums/RepetitionPattern'

const repetitionPatterns = [
  { value: RepetitionPattern.NONE, label: 'None' },
  { value: RepetitionPattern.HOURLY, label: 'Hourly' },
  { value: RepetitionPattern.DAILY, label: 'Daily' },
  { value: RepetitionPattern.WEEKLY, label: 'Weekly' },
  { value: RepetitionPattern.MONTHLY, label: 'Monthly' },
  { value: RepetitionPattern.YEARLY, label: 'Yearly' },
  { value: RepetitionPattern.CUSTOM, label: 'Custom' },
]

export default repetitionPatterns
