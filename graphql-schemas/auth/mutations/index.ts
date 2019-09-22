import { singUpMutation } from './sign-up';
import { signInMutation } from './sign-in';

export const authMutations = {
  ...singUpMutation,
  ...signInMutation,
}