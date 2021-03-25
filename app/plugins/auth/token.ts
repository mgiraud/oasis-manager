import jwtDecode, { JwtPayload } from 'jwt-decode'
import { Cookie } from './cookie'

export enum TokenStatusEnum {
    UNKNOWN = 'UNKNOWN',
    VALID = 'VALID',
    EXPIRED = 'EXPIRED'
  }

export default class Token {
    rawToken?: string
    name: string
    iat?: number
    exp?: number
    status: TokenStatusEnum
    cookie: Cookie

    constructor (cookie: Cookie, name: string) {
      this.cookie = cookie
      this.name = name
      this._init()
      this.status = this._computeValidity()
    }

    get isValid (): boolean {
      return this.status === TokenStatusEnum.VALID
    }

    private _init () {
      this.rawToken = this.cookie.syncCookies(this.name) as string | undefined
      if (this.rawToken === undefined) {
        return
      }
      const decodedToken = jwtDecode <JwtPayload>(this.rawToken)
      this.iat = decodedToken.iat ? decodedToken.iat * 1000 : undefined
      this.exp = decodedToken.exp ? decodedToken.exp * 1000 : undefined
    }

    private _computeValidity () {
      if (!this.exp) {
        return TokenStatusEnum.UNKNOWN
      }
      const now = Date.now()

      const timeSlackMillis = 500
      this.exp -= timeSlackMillis

      if (now < this.exp) {
        return TokenStatusEnum.VALID
      }

      return TokenStatusEnum.EXPIRED
    }
}
