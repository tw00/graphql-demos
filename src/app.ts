import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
// import createGraphQL from './graphql';
import expressPlayground from 'graphql-playground-middleware-express';

function createApp() {
  const app = express();

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  // GraphQL
  // app.use('/graphql', createGraphQL());
  app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

  // Load API routes
  app.use(routes());

  return app;
}

createApp().listen(8000, () => {
  console.log(`🛡️ Server listening on: http://localhost:${8000}`);
});
