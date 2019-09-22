import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from "graphql";
import * as GraphQLLong from 'graphql-type-long';

import { SignUpArgs } from "../models/sign-up-args"
import { User } from "../../../mongoose-schemas";
import { sign } from "../../../jwt";
import { LoginResponse, hashPassword } from "../../../core";

const signUpType = new GraphQLObjectType({
  name: 'SingUpType',
  fields: {
    accessToken: {
      type: new GraphQLNonNull(GraphQLString),
    },
    refreshToken: {
      type: new GraphQLNonNull(GraphQLString),
    },
    deathTime: {
      type: new GraphQLNonNull(GraphQLLong),
    },
  },
});

export const singUpMutation = {
  signUp: {
    type: signUpType,
    args: {
      username: {
        type: new GraphQLNonNull(GraphQLString),
      },
      email: {
        type: new GraphQLNonNull(GraphQLString),
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve,
  }
}

async function resolve(prevObj: unknown, args: SignUpArgs): Promise<LoginResponse> {
  if (args.password.length < 3 || args.password.length > 50) {
    throw new Error('Password length must be in range 3-50');
  }
  const password = await hashPassword(args.password);
  const user = new User({
    email: args.email,
    password,
    username: args.username,
  });
  await user.save();
  return await sign(user.email, user.username);
}