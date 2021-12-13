import { graphql } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import gql from 'graphql-tag';
import { toJSON } from '../lib';

const schema = makeExecutableSchema({
  typeDefs: gql`
    interface Vehicle {
      maxSpeed: Int
    }

    type Airplane implements Vehicle {
      maxSpeed: Int
      wingspan: Int
    }

    type Car implements Vehicle {
      maxSpeed: Int
      licensePlate: String
    }

    # union and interface is essentially the same, key differences are:
    # - interfaces allows querying common fields OUTSIDE of the inline fragment in the query
    # - unions can be created from types that don't implement a shared interface
    # union VehicleUnion = Airplane | Car

    type Query {
      getThing(id: Int): Vehicle
    }
  `,
  resolvers: {
    Vehicle: {
      __resolveType(obj) {
        console.log('- __resolveType', obj);

        if (obj.wingspan) {
          return 'Airplane';
        }

        if (obj.licensePlate) {
          return 'Car';
        }

        return null;
      },
    },
    Query: {
      getThing(_obj, { id }) {
        console.log('- getThing', id);
        return { maxSpeed: 100, wingspan: 4 };
      },
    },
  },
});

const query = `
  {
    getThing(id: 123) {
      ... on Airplane {
        maxSpeed
        wingspan
      }
    }
  }
`;

graphql(schema, query).then((response) => {
  console.log(toJSON(response));
});
