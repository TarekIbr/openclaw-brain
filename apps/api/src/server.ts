import Fastify from 'fastify';
import { registerHealthRoute } from './routes/health';

export function buildServer(version: string) {
  const app = Fastify({ logger: true });

  void registerHealthRoute(app, version);

  return app;
}
