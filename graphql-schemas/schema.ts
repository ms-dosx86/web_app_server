import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
import { authMutations } from './auth/mutations';

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        }
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      ...authMutations,
    }
  })
});
