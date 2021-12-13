import { makeExecutableSchema } from '@graphql-tools/schema';
import { readFileSync } from 'fs';
import { graphql } from 'graphql';
import { resolve } from 'path';

const root = {
  hello: () => {
    return 'Hello world!';
  },
};

const readToString = (filename) => {
  return readFileSync(resolve(__dirname, filename), 'utf8');
};

const schema = makeExecutableSchema({
  typeDefs: [readToString('schema.graphql')],
  resolvers: {
    Query: root,
  },
});

graphql(schema, '{ hello }').then((response) => {
  console.log(response);
});
