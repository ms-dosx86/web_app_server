import * as bcrypt from 'bcrypt';

/**
 * Compares passwords.
 * @param password Not hashed password.
 * @param hashedPassword Hashed password.
 */
export function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}
