import app from './app';
import { connectToDatabase } from './config/db';
import { env } from './config/env';

async function start(): Promise<void> {
  try {
    await connectToDatabase();

    app.listen(env.port, () => {
      console.log(`User activity service is running on port ${env.port}`);
    });
  } catch (error) {
    console.error('Failed to start user activity service:', error);
    process.exit(1);
  }
}

start();
