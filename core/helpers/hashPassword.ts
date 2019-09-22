import * as bcrypt from 'bcrypt';

const saltRounds = 10;

/**
 * Generates hash for password to store in database.
 * @param password Password.
 */
export function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
}
