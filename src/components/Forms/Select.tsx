import { forwardRef } from 'react'
import { default as ReactSelect, Props, StylesConfig } from 'react-select'
import { useTranslation } from 'next-i18next'

const colourStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    height: '44px',
    border: 0,
    '& input:focus': { '--tw-ring-color': 'transparent' },
    fontSize: '14px',
  }),
}

const Select = forwardRef((props: Props, ref: any) => {
  const { t } = useTranslation()

  return (
    <ReactSelect
      ref={ref}
      className="shadow"
      styles={colourStyles}
      formatOptionLabel={(data: any) => t(data.label)}
      {...props}
    />
  )
})
Select.displayName = 'Select'

export default Select
