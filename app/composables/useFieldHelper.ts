
interface BaseFieldProps {
  error?: string,
  value?: any,
  fieldAttrs ?: {[key: string]: string | number | boolean},
}

export function useFieldHelper(props: BaseFieldProps) {
  const isDisabled = props.fieldAttrs && props.fieldAttrs.disabled === 'disabled'
  const isRequired = props.fieldAttrs && props.fieldAttrs.required === true

  const disabledColor = 'gray-300'

  const getColor = (): string => {
    if (isDisabled) {
      return disabledColor
    }
    if (!props.value) {
      return 'gray-500'
    }
    if (!!props.value && !props.error) {
      return 'primary'
    }
    if (!!props.error) {
      return 'accent'
    }
    return 'gray-500'
  }

  return {
    isRequired,
    isDisabled,
    disabledColor,
    getColor
  }
}
