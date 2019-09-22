import * as express from 'express';
import { Request, Response } from 'express';
import *  as graphqlHttp from 'express-graphql';

import { schema } from './graphql-schemas/schema';
import { connect } from 'mongoose';

const app = express();
const PORT = 3000;

async function bootstrap() {
  app.use('/graphql', graphqlHttp({
    schema,
    graphiql: true,
  }));
  
  app.get('/', (req: Request, res: Response) => {
    res.send({ message: 'helloooooooooooo world' });
  });

  await app.listen(PORT);
  console.log(`server started at http://localhost:${PORT}`);
  await connect('mongodb://localhost:27017/test', { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true, });
  console.log('connected to database');
}

bootstrap();