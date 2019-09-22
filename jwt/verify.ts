import *  as jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_KEY } from './constants';

/**
 * Verifies token.
 * @param token Token.
 */
export function verify(token: string): Promise<boolean> {
  return new Promise(resolve => {
    jwt.verify(token, ACCESS_TOKEN_KEY, err => {
      if (err) {
        resolve(false);
      }
      resolve(true);
    })
  })
}
