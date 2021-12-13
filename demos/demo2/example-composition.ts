// TODO: Discuss with Craig

import { composeResolvers } from '@graphql-tools/resolvers-composition';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { graphql } from 'graphql';
import { toJSON } from '../lib';

const resolvers = {
  Query: {
    myQuery: (_root, args) => {
      if (args.something === '1') {
        return true;
      }
      return false;
    },
  },
};

const isAuthenticated = () => (next) => async (root, args, context, info) => {
  if (!context.currentUser) {
    throw new Error('You are not authenticated!');
  }
  return next(root, args, context, info);
};

const hasRole =
  (role: string) => (next) => async (root, args, context, info) => {
    if (
      !context.currentUser.roles &&
      !context.currentUser.roles.includes(role)
    ) {
      throw new Error('You are not authorized!');
    }

    return next(root, args, context, info);
  };

const composedResolvers = composeResolvers(resolvers, {
  'Query.myQuery': [isAuthenticated(), hasRole('EDITOR')],
});

const schema = makeExecutableSchema({
  typeDefs: `
    type Query {
      myQuery(something: String): Boolean
    }
  `,
  resolvers: composedResolvers,
});

// --- Query

const context = { currentUser: { roles: ['EDITOR'] } };
const query = '{ myQuery(something:"1") }';

graphql(schema, query, null, context).then((response) => {
  console.log(toJSON(response));
});
