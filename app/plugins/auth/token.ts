import jwtDecode, { JwtPayload } from 'jwt-decode'

export enum TokenStatusEnum {
    UNKNOWN = 'UNKNOWN',
    VALID = 'VALID',
    EXPIRED = 'EXPIRED'
  }

export default class Token {
    rawToken: string
    iat?: number
    exp?: number
    status: TokenStatusEnum

    constructor (rawToken: string, exp?: number, iat?: number) {
      this.rawToken = rawToken
      this.iat = iat ? iat * 1000 : iat
      this.exp = exp ? exp * 1000 : exp
      this.status = TokenStatusEnum.UNKNOWN
      this._computeValidity()
    }

    static createFromRawToken (rawToken: string) {
      console.log(rawToken)
      const decodedToken = jwtDecode <JwtPayload>(rawToken)
      return new Token(rawToken, decodedToken.exp, decodedToken.iat)
    }

    isValid (): boolean {
      return this.status === TokenStatusEnum.VALID
    }

    private _computeValidity () {
      if (!this.exp) {
        return
      }
      const now = Date.now()
      console.log(now)
      console.log(this.exp)

      const timeSlackMillis = 500
      this.exp -= timeSlackMillis

      if (now < this.exp) {
        return TokenStatusEnum.VALID
      }

      return TokenStatusEnum.EXPIRED
    }
}
