export interface HealthResponse {
  ok: true;
  ts: string;
  version: string;
}

export const healthResponseSchema = {
  type: 'object',
  required: ['ok', 'ts', 'version'],
  properties: {
    ok: { type: 'boolean', const: true },
    ts: { type: 'string' },
    version: { type: 'string' }
  }
} as const;
