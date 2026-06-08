import cors from 'cors';
import express from 'express';

import routes from './routes/index';
import { errorHandler } from './middlewares/errorHandler';
import { notFoundHandler } from './middlewares/notFoundHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'user-activity-service',
  });
});

app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
