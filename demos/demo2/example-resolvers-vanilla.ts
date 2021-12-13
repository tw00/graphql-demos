import { buildASTSchema, graphql } from 'graphql';
import gql from 'graphql-tag';
import { toJSON } from '../lib';

const schema = buildASTSchema(gql`
  type SubThing {
    x: Float
    y: Float
  }

  type Thing {
    a: String
    b: Int
    c: [SubThing]
    d: String
  }

  type Query {
    getThing(id: Int): Thing
  }
`);

const root = {
  // Resolver Syntax: name(args, context, info)
  SubThing: {
    x(_1, _2, _3) {
      console.log('- SubThing:x', _1, _2, _3);
      return 5;
    },
    y(_1, _2, _3) {
      console.log('- SubThing:y', _1, _2, _3);
      return 6;
    },
  },
  Thing: {
    a() {
      console.log('- Thing:a');
      return 'xxx';
    },
    b() {
      console.log('- Thing:b');
      return 20;
    },
    c(_) {
      // "Trivial resolvers"
      console.log('- Thing:c', _);
      return _.c;
    },
  },
  Query: {
    getThing({ id }, context, _schema) {
      console.log('- getThing', context);
      const c = [{ x: 0, y: 0 }, { hi: 1 }];
      const d = () => {
        console.log('- getThing:d');
        return `hi ${id} from func`;
      };
      return { a: 'will be overwriten', b: 10, c, d, ...root.Thing };
    },
  },
};

graphql(
  schema,
  '{ getThing(id:123) { a b c { x y } d } }',
  { ...root.Query },
  { x: 1 },
).then((response) => {
  console.log(toJSON(response));
});
