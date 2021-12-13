import { makeExecutableSchema } from '@graphql-tools/schema';
import { graphql } from 'graphql';
import gql from 'graphql-tag';

const root = {
  hello: () => {
    return 'Hello world!';
  },
};

const schema = makeExecutableSchema({
  typeDefs: gql`
    type Query {
      hello: String
    }
  `,
  resolvers: {
    Query: root,
  },
});

graphql(schema, '{ hello }').then((response) => {
  console.log(response);
});
