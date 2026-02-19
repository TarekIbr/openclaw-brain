import type { FastifyInstance } from 'fastify';

const healthResponseSchema = {
  type: 'object',
  required: ['ok', 'ts', 'version'],
  properties: {
    ok: { type: 'boolean', const: true },
    ts: { type: 'string' },
    version: { type: 'string' }
  }
} as const;

export async function registerHealthRoute(app: FastifyInstance, version: string) {
  app.get('/api/health', {
    schema: {
      response: {
        200: healthResponseSchema
      }
    }
  }, async () => {
    return {
      ok: true,
      ts: new Date().toISOString(),
      version
    };
  });
}
