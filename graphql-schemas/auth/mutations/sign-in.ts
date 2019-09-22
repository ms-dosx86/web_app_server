import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from "graphql";

import * as GraphQLLong from "graphql-type-long";
import { SignInArgs } from "../models/sign-in-args";
import { LoginResponse, comparePasswords } from "../../../core";
import { User } from "../../../mongoose-schemas";
import { sign } from "../../../jwt";

const signInType = new GraphQLObjectType({
  name: 'SingInType',
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

export const signInMutation = {
  signIn: {
    type: signInType,
    args: {
      username: {
        type: new GraphQLNonNull(GraphQLString),
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve,
  }
}

async function resolve(prevObj: unknown, args: SignInArgs): Promise<LoginResponse> {
  const user = await User.findOne({ username: args.username });
  if (user && await comparePasswords(args.password, user.password)) {
    return sign(user.email, user.username);
  }
  throw new Error('User not found');
}