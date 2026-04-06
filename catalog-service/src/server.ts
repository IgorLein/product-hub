import app from './app.js';
import sequelize from './config/db.js';
import { env } from './config/env.js';
import { initModels } from './models/index.js';

async function start(): Promise<void> {
  try {
    initModels();

    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    await sequelize.sync();
    console.log('Models synchronized successfully.');

    app.listen(env.port, () => {
      console.log(`Catalog service is running on port ${env.port}`);
    });
  } catch (error) {
    console.error('Failed to start catalog service:', error);
    process.exit(1);
  }
}

start();
