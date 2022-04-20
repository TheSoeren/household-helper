import { default as ReactSelect, Props, StylesConfig } from 'react-select'

const colourStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    height: '44px',
    border: 0,
    '& input:focus': { '--tw-ring-color': 'transparent' },
  }),
}

export default function Select(props: Props) {
  return <ReactSelect className="shadow" styles={colourStyles} {...props} />
}
