import { Control, Controller } from 'react-hook-form'
import Select from 'react-select'

interface IconSelectProps {
  name: string
  control: Control
  placeholder: string
  options: { value: string; label: string }[]
}

// the root tag must not be a react fragment, because of the styling of ValueContainer
const IconLabelDisplay = (props: any) => (
  <div>
    <i
      className={
        props.value + ' inline-flex rounded-full min-w-[20px] min-h-[20px]'
      }
    />
    <span className="ml-2">{props.label}</span>
  </div>
)

export default function IconSelect({
  name,
  control,
  placeholder,
  options,
}: IconSelectProps) {
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
          formatOptionLabel={(data) => <IconLabelDisplay {...data} />}
          blurInputOnSelect
          isClearable
        />
      )}
    />
  )
}
