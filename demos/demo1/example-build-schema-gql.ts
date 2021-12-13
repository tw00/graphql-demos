import { graphql, buildASTSchema } from 'graphql';
import gql from 'graphql-tag';

const schema = buildASTSchema(gql`
  type Query {
    hello: String
  }
`);

const root = {
  hello: () => {
    return 'Hello world!';
  },
};

graphql(schema, '{ hello }', root).then((response) => {
  console.log(response);
});
