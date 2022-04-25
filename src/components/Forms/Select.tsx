import { forwardRef } from 'react'
import { default as ReactSelect, Props, StylesConfig } from 'react-select'

const colourStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    height: '44px',
    border: 0,
    '& input:focus': { '--tw-ring-color': 'transparent' },
  }),
}

const Select = forwardRef((props: Props, ref: any) => (
  <ReactSelect ref={ref} className="shadow" styles={colourStyles} {...props} />
))
Select.displayName = 'Select'

export default Select
