import { graphql, GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { mapSchema, getDirectives, MapperKind } from '@graphql-tools/utils';
import gql from 'graphql-tag';
import { toJSON } from '../lib';

function upperDirective(schema: GraphQLSchema): GraphQLSchema {
  return mapSchema(schema, {
    [MapperKind.INPUT_OBJECT_TYPE]: (fieldConfig) => {
      console.log('- mapSchema(INPUT_OBJECT_TYPE)', fieldConfig);
      return fieldConfig;
    },
    [MapperKind.FIELD]: (fieldConfig) => {
      const directives = getDirectives(schema, fieldConfig);
      console.log('- mapSchema(FIELD)', directives);
      return fieldConfig;
    },
    [MapperKind.QUERY]: (fieldConfig) => {
      console.log('- mapSchema(QUERY)', fieldConfig);
      return fieldConfig;
    },
    [MapperKind.TYPE]: (fieldConfig) => {
      const directives = getDirectives(schema, fieldConfig);
      console.log('- mapSchema(TYPE)', directives);
      return fieldConfig;
    },
  });
}

const schema = makeExecutableSchema({
  typeDefs: gql`
    directive @foobar(reason: String = "No longer supported") on OBJECT
    directive @upper on FIELD
    directive @lower on FIELD

    type Thing @foobar {
      a: String
      b: String
    }

    type Query {
      getThing(id: Int): Thing
    }
  `,
  resolvers: {
    Query: {
      getThing(_, args, context, { fieldNodes, operation }) {
        const firstDirective = fieldNodes[0].directives[0].name.value;
        const firstOperationDirective =
          operation.selectionSet.selections[0].directives[0].name.value;
        const firstSelectionDirective =
          fieldNodes[0].selectionSet.selections[0].directives[0].name.value;

        console.log('- getThing', {
          firstDirective,
          firstOperationDirective,
          firstSelectionDirective,
        });
        return { a: 'hello' };
      },
    },
  },
});

const schemaWithUpper = upperDirective(schema);

graphql(schemaWithUpper, '{ getThing(id:123) @lower { a @upper b } }').then(
  (response) => {
    console.log(toJSON(response));
  },
);
