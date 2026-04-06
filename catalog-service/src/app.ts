import cors from 'cors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import routes from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  '/products',
  express.static(path.join(__dirname, '../public/products'))
);

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'catalog-service',
  });
});

app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
