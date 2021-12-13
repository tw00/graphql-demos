import { graphql, buildSchema } from 'graphql';
import { toJSON } from '../lib';

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }

  type Query {
    getDie(numSides: Int): RandomDie
  }
`);

// This class implements the RandomDie GraphQL type
class RandomDie {
  public numSides;

  constructor(numSides) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({ numRolls }) {
    const output = [];
    for (let i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}

// The root provides the top-level API endpoints
const root = {
  getDie: ({ numSides }) => {
    return new RandomDie(numSides || 6);
  },
};

// Run query
const query = `
{
  getDie(numSides: 5) {
    roll(numRolls: 10)
  }
}
`;

graphql(schema, query, root).then((response) => {
  console.log(toJSON(response.data));
});
