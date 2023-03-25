/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import config, { appConfig, graphqlConfig } from './config';
import logger from './config/logger';

const app = express();
const host = config.HOST;
const port = config.PORT || 3033;
const apiVersion = config.API_VERSION || 'v1';

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

graphqlConfig(app);
appConfig(app);


app.listen(port, () => {
  logger.info(`Server started at ${host}:${port}/api/${apiVersion}/`);
  logger.info(`Graphql server started at ${host}:${port}/graphql`);
});

export default app;