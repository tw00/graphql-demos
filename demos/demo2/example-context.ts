import { graphqlSync } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import gql from 'graphql-tag';
import { toJSON } from '../lib';

const schema = makeExecutableSchema({
  typeDefs: gql`
    type Query {
      getThing(id: Int): String
    }
  `,
  resolvers: {
    Query: {
      getThing(_, { id }, ctx) {
        console.log(`- getThing: ${id}, Context:`, ctx);
        return `hi:${id}:${ctx.y(id)}`;
      },
    },
  },
});

const ctx = { x: 1, y: (id) => 2 * id };

const response = graphqlSync(schema, '{ getThing(id:123) }', null, ctx);
console.log(toJSON(response));
