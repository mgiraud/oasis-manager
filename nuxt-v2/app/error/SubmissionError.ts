import { FormErrors } from '../api/repository'

export default class SubmissionError extends Error {
  errors : FormErrors
  constructor (errors: FormErrors) {
    super('Submit Validation Failed')
    this.errors = errors
    if (Error.captureStackTrace !== undefined) {
      Error.captureStackTrace(this, this.constructor)
    }
    this.name = this.constructor.name

    return this
  }
}
