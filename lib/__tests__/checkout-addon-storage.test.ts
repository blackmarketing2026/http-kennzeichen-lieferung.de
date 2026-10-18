import { beforeEach, describe, expect, it, vi } from 'vitest';

const { query, createIntent } = vi.hoisted(() => ({ query: vi.fn(), createIntent: vi.fn() }));
vi.mock('stripe', () => ({ default: class {
  customers = { create: async () => ({ id: 'cus_test' }) };
  paymentIntents = { create: createIntent };
} }));
vi.mock('next/server', () => ({ after: vi.fn() }));
vi.mock('next/headers', () => ({ cookies: async () => ({ get: () => undefined }) }));
vi.mock('@/lib/db', () => ({
  isDatabaseConfigured: () => true, ensureCheckoutSchema: vi.fn(), query,
}));
vi.mock('@/lib/customer-auth', () => ({ CUSTOMER_SESSION_COOKIE: 'customer', verifyCustomerSessionToken: () => null }));

import { POST } from '@/app/api/create-payment-intent/route';

beforeEach(() => {
  vi.stubEnv('stripe_api', 'pk_test_mock');
  vi.stubEnv('stripe_live', 'sk_test_mock');
  query.mockReset().mockImplementation(async (sql: string) => sql.startsWith('SELECT id, status')
    ? { rows: [] } : { affectedRows: 1, rows: [] });
  createIntent.mockReset().mockImplementation(async (params) => ({
    id: 'pi_test123', client_secret: 'pi_test123_secret_test', ...params,
  }));
});

describe('checkout add-on storage', () => {
  it.each([
    [[], 2450],
    [['holderScrews'], 3240],
    [['warningVest'], 2940],
    [['holderScrews', 'warningVest'], 3730],
  ] as const)('stores explicit selection %j and server price', async (addOns, total) => {
    const response = await POST(new Request('https://shop.example.com/api/create-payment-intent', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plate: 'B AB 1234', plateType: 'standard', color: 'black', quantity: 2,
        parkingPlate: false, bikeRackPlate: false, addOns, cartId: 'addon-storage-test-1234' }),
    }));
    expect(response.status).toBe(200);
    expect(createIntent).toHaveBeenCalledWith(expect.objectContaining({ amount: total }), expect.anything());
    const insert = query.mock.calls.find(([sql]) => String(sql).includes('INSERT INTO orders'));
    expect(insert).toBeDefined();
    expect(insert![0]).toContain('selected_addons');
    expect(insert![1]).toContain(JSON.stringify(addOns));
    expect(insert![1]).toContain(total);
  });
});
