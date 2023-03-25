import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { Express } from 'express';
import typeDefs from './schema';
import resolvers from './resolvers';

const graphqlConfig = (app: Express) => {
  // schema
  const schema = buildSchema(typeDefs);
  // Root resolver
  const root = resolvers;

  app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      rootValue: root,
      graphiql: true,
    }),
  );
};

export default graphqlConfig;
