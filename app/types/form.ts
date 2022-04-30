export type FormOptions = RequestInit & {
  params?: {[propertyPath: string]: string}
}

export interface FormViolation {
  message: string
  propertyPath: string
}

export interface FormErrors {
  _error: string
  [propertyPath: string]: string
}
