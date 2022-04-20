import { Control, Controller } from 'react-hook-form'
import Select from '@/components/Forms/Select'
import Option from '@/models/Option'

interface IconSelectProps<T> {
  name: string
  control: Control
  placeholder: string
  options: T[]
}

// the root tag must not be a react fragment, because of the styling of ValueContainer
const IconLabelDisplay = <T extends Option>(props: T) => (
  <div>
    <i
      className={
        props.value + ' inline-flex rounded-full min-w-[20px] min-h-[20px]'
      }
    />
    <span className="ml-2">{props.label}</span>
  </div>
)

export default function IconSelect<T extends Option = Option>({
  name,
  control,
  placeholder,
  options,
}: IconSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          instanceId={field.name}
          placeholder={placeholder}
          options={options}
          formatOptionLabel={(data: unknown) => (
            <IconLabelDisplay<T> {...(data as T)} />
          )}
          blurInputOnSelect
          isClearable
        />
      )}
    />
  )
}
