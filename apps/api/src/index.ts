import dotenv from 'dotenv';
import { buildServer } from './server';

dotenv.config();

const port = Number(process.env.PORT ?? 8080);
const nodeEnv = process.env.NODE_ENV ?? 'development';
const version = process.env.VERSION ?? '0.1.0';

async function start() {
  const app = buildServer(version);

  try {
    await app.listen({ port, host: '0.0.0.0' });
    app.log.info(`api started on :${port} (${nodeEnv})`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

void start();
