import * as jwt from 'jsonwebtoken';

import { LoginResponse } from "../core";
import { JwtOptions } from './jwt-options';
import { ACCESS_TOKEN_KEY, ACCESS_TOKEN_EXPIRES_VALUE, REFRESH_TOKEN_KEY, REFRESH_TOKEN_EXPIRES_VALUE } from './constants';

/**
 * Generates access and refresh tokens.
 * @param email Email.
 * @param username Username.
 */
export function sign(email: string, username: string): Promise<LoginResponse> {
  return generateTokens(email, username)
    .then(tokens => ({
      ...tokens,
      deathTime: Date.now() + ACCESS_TOKEN_EXPIRES_VALUE * 1000,
    }));
}

function generateTokens(email: string, username: string): Promise<{accessToken: string; refreshToken: string}> {
  const accessTokenPromise = getToken(email, username, ACCESS_TOKEN_KEY, { expiresIn: ACCESS_TOKEN_EXPIRES_VALUE });
  const refreshTokenPromise = getToken(email, username, REFRESH_TOKEN_KEY, { expiresIn: REFRESH_TOKEN_EXPIRES_VALUE });
  return Promise.all([accessTokenPromise, refreshTokenPromise])
    .then(([accessToken, refreshToken]) => ({ accessToken, refreshToken }))
}


function getToken(email: string, username: string, key: string, options?: JwtOptions): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    jwt.sign({ email, username }, key, options, (err, token: string) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
}
