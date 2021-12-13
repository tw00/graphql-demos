import { GraphQLScalarType, graphqlSync } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import gql from 'graphql-tag';

const JSONScalarType = new GraphQLScalarType({
  name: 'JSON',
  description: 'This is a JSON scalar type',
  serialize(value) {
    console.log('- serialize', value);
    return JSON.stringify(value);
  },
  parseValue(value) {
    console.log('- parseValue', value);
    return eval(`[${value}]`).pop();
  },
  // parseLiteral(ast) {
  //   console.log('- parseLiteral', (ast as any)?.value);
  //   if (ast.kind === 'StringValue') {
  //     return eval(`[${ast.value}]`).pop();
  //   }
  // },
});

const schema = makeExecutableSchema({
  typeDefs: gql`
    scalar JSON
    type Query {
      getThing(id: Int, data: JSON): JSON
    }
  `,
  resolvers: {
    JSON: JSONScalarType,
    Query: {
      getThing(_, { id, data }) {
        console.log(`- getThing: ${id}`, data);
        return { x: id };
      },
    },
  },
});

const response = graphqlSync(schema, '{ getThing(id:123, data:"{x:42}") }');
console.log(response.data);
