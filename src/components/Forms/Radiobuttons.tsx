import { RegisterOptions, useFormContext } from 'react-hook-form'
import Option from '@/models/Option'
import { useTranslation } from 'next-i18next'

interface Props<T> {
  options: T[]
  name: string
  validation: RegisterOptions
  className?: string
}

export default function RadioButtons<T extends Option>({
  options,
  className = '',
  name,
  validation,
}: Props<T>) {
  const { register } = useFormContext()
  const { t } = useTranslation('common')

  return (
    <>
      {options.map((option) => (
        <div className={'form-check ' + className} key={option.value}>
          <input
            className="w-4 h-4 mt-1 mr-2 text-transparent align-top transition duration-200 cursor-pointer checked:text-slate-600"
            type="radio"
            value={option.value}
            {...register(name, validation)}
          />
          <label className="inline-block text-gray-600 form-check-label">
            {t(option.label)}
          </label>
        </div>
      ))}
    </>
  )
}
