import { loadSchema } from '@graphql-tools/load';
import { UrlLoader } from '@graphql-tools/url-loader';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { resolve } from 'path';

(async () => {
  // load from string w/ no loaders
  const schema1 = await loadSchema('type A { foo: String }', { loaders: [] });

  // load from endpoint
  const schema2 = await loadSchema(
    'https://graphql-weather-api.herokuapp.com',
    {
      loaders: [new UrlLoader()],
    },
  );

  // load from a single schema file
  const schema3 = await loadSchema(resolve(__dirname, 'schema.graphql'), {
    loaders: [new GraphQLFileLoader()],
  });

  // load from multiple files using glob
  const schema4 = await loadSchema('./demos/**/*.graphql', {
    loaders: [new GraphQLFileLoader()],
  });

  console.log({
    schema1: schema1.constructor.name,
    schema2: schema2.constructor.name,
    schema3: schema3.constructor.name,
    schema4: schema4.constructor.name,
  });
})();
