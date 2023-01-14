import compression from 'compression';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import httpStatus from 'http-status';
import xss from 'xss-clean';
import { CORS, ENVIRONMENT } from './config';
import { PRODUCTION } from './constants/environments.constants';
import routes from './routes';
import ApiError from './utils/ApiError';

const app: Application = express();

if (ENVIRONMENT === PRODUCTION) {
  app.set('trust proxy', 1); // trust first proxy

  app.use(helmet());
  app.use(xss());
  app.use(compression());
}

// enable cors
app.use(
  cors({
    credentials: true,
    origin: CORS.ORIGIN.split(','),
    optionsSuccessStatus: 200,
  }),
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));

// Routes
app.use('/', routes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

export default app;
