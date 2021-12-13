import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import request from 'superagent';
import gqlQuery from 'superagent-graphql';

const schema = buildSchema(`
  type Query {
    hello(id: Int!): String
  }
`);

const root = {
  hello: ({ id }) => {
    return `Hello world! ${id}`;
  },
};

const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);

const server = app.listen(4001);
console.log('Running a GraphQL API server at localhost:4001/graphql');

// Query with superagent
const query = gqlQuery(
  `query SayHello($id: Int!) {
    hello(id: $id)
  }`,
  { id: 123 },
);

request
  .post(':4001/graphql')
  .use(query)
  .end((err, res) => {
    if (err) {
      console.log({ ...err.response.body });
    } else {
      console.log(res.body);
    }
    server.close();
  });
