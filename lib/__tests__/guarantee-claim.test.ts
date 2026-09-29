import { beforeEach, describe, expect, it, vi } from 'vitest';

const { query } = vi.hoisted(() => ({ query: vi.fn() }));
vi.mock('@/lib/db', () => ({
  ensureSchema: vi.fn(), isDatabaseConfigured: () => true, query,
}));

import { POST } from '@/app/api/liefergarantie/antraege/route';

const orderId = '11111111-2222-4333-8444-555555555555';

function request(receipt: File) {
  const form = new FormData();
  form.set('orderId', orderId);
  form.set('email', 'kunde@example.com');
  form.set('replacementDate', '2026-09-20');
  form.set('receipt', receipt);
  return new Request('http://localhost/api/liefergarantie/antraege', { method: 'POST', body: form });
}

describe('Liefergarantie-Antrag', () => {
  beforeEach(() => {
    query.mockReset();
    query.mockResolvedValueOnce({ rows: [{ id: orderId }] })
      .mockResolvedValueOnce({ rows: [{ count: 0 }] })
      .mockResolvedValueOnce({ rows: [], affectedRows: 1 });
  });

  it('speichert einen gültigen PDF-Beleg als nicht öffentliche Datenbank-BLOB', async () => {
    const pdf = new File([Buffer.from('%PDF-1.4\nbeleg')], 'kaufbeleg.pdf', { type: 'application/pdf' });
    const response = await POST(request(pdf));
    expect(response.status).toBe(201);
    expect(query).toHaveBeenCalledTimes(3);
    expect(query.mock.calls[2][0]).toContain('INSERT INTO delivery_guarantee_claims');
    expect(query.mock.calls[2][1][7]).toEqual(Buffer.from('%PDF-1.4\nbeleg'));
  });

  it('weist einen nur als PDF deklarierten Fremdtyp vor der Speicherung ab', async () => {
    const fake = new File([Buffer.from('kein PDF')], 'kaufbeleg.pdf', { type: 'application/pdf' });
    const response = await POST(request(fake));
    expect(response.status).toBe(400);
    expect(query).not.toHaveBeenCalled();
  });
});
