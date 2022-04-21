import { useController, Control } from 'react-hook-form'
import { useState } from 'react'
import Option from '@/models/Option'

interface CheckboxesProps<T> {
  options: T[]
  control: Control
  name: string
  className?: string
}

export default function Checkboxes<T extends Option>({
  options,
  control,
  name,
  className = '',
}: CheckboxesProps<T>) {
  const { field } = useController({
    control,
    name,
  })
  const [value, setValue] = useState(field.value || [])

  return (
    <>
      {options.map((option) => (
        <div className={'form-check ' + className} key={option.value}>
          <input
            className="w-4 h-4 mt-1 mr-2 text-transparent align-top transition duration-200 rounded-md cursor-pointer checked:text-slate-600"
            onChange={() => {
              let arrayCopy = [...value]
              if (arrayCopy.includes(option.value)) {
                arrayCopy = arrayCopy.filter((v) => v !== option.value)
              } else {
                arrayCopy.push(option.value)
              }

              field.onChange(arrayCopy)
              setValue(arrayCopy)
            }}
            type="checkbox"
            checked={value.includes(option.value)}
            value={option.value}
          />
          <label className="inline-block text-gray-600 form-check-label">
            {option.label}
          </label>
        </div>
      ))}
    </>
  )
}
