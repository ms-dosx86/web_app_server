/**
 * Jwt options.
 */
export interface JwtOptions {

  /**
   * Time after which token will be invalid.
   * Don't use it with `string` values.
   * Like `jwt.sign('string', 'key', { expiresIn: 3600})`.
   * It won't work. Use an `object` instead.
   */
  expiresIn: number | string;

}
