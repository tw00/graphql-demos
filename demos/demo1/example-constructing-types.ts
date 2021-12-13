import {
  graphql,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

// Define the Query type
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => {
        return 'Hello world!';
      },
    },
  },
});

const schema = new GraphQLSchema({ query: queryType });

graphql(schema, '{ hello }').then((response) => {
  console.log(response);
});
