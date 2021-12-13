/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request } from 'express';
import { graphqlHTTP, OptionsData, RequestInfo } from 'express-graphql';
import { buildSchema } from 'graphql';
import request from 'superagent';
import gqlQuery from 'superagent-graphql';

const schema = buildSchema(`
  type Query { hello: String }
`);

const root = {
  hello: () => `Hello world!`,
};

const app = express();

type Extension = (ctx: RequestInfo) => ReturnType<typeof extensions>;
interface RequestInfoWithContext extends RequestInfo {
  context: { startTime: number };
}

const extensions = ({ context, ...rest }: RequestInfoWithContext) => {
  console.log({ context, ...rest });
  return {
    runTime: Date.now() - context.startTime,
  };
};

app.use(
  '/graphql',
  graphqlHTTP((req): OptionsData => {
    console.log('Received requst', req.headers);
    return {
      schema,
      rootValue: root,
      context: { startTime: Date.now() },
      graphiql: false,
      extensions: extensions as Extension,
    };
  }),
);

const server = app.listen(4001);
console.log('Running a GraphQL API server at localhost:4001/graphql');

// Query with superagent
const query = gqlQuery(`query { hello }`);

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
