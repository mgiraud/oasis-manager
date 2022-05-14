export function useStringHelper() {
  const capitalize = (value: string | null) => {
    if (!value) { return '' }
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }

  return {
    capitalize
  }
}
