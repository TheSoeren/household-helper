import { useEffect, useLayoutEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

function getPropByString(obj: any, propString: string) {
  if (!propString) return obj

  let props = propString.split('.')
  let candidate = obj

  while (props.length) {
    let prop = props.shift() ?? ''
    candidate = candidate[prop]

    if (!props.length || candidate === undefined) {
      return candidate
    }
  }
}

export default function useValidation(relevantFields: string[]): any {
  const errorObject = relevantFields.reduce(
    (prev, v) => ({
      ...prev,
      [v]: '',
    }),
    {}
  )

  const {
    formState: { errors },
  } = useFormContext()
  const [error, setError] = useState(errorObject)

  useEffect(() => {}, [errors])

  useLayoutEffect(
    () => {
      setError(
        relevantFields.reduce(
          (prev, v) => ({
            ...prev,
            [v]: getPropByString(errors, v)?.type,
          }),
          {}
        )
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    relevantFields.map((v) => getPropByString(errors, v))
  )

  return { error }
}
