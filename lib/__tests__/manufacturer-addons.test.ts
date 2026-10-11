import { beforeEach, describe, expect, it, vi } from 'vitest';

const { query, createManufacturerOrder } = vi.hoisted(() => ({ query: vi.fn(), createManufacturerOrder: vi.fn() }));
vi.mock('@/lib/db', () => ({ query }));
vi.mock('@/lib/kennzeichen-api', () => ({ createManufacturerOrder }));
vi.mock('@/lib/logger', () => ({ logManufacturerEvent: vi.fn() }));

import { submitOrderToManufacturer } from '@/lib/manufacturer-order';

const address = {
  name: 'Max Mustermann',
  address: { line1: 'Musterstraße 12', city: 'Berlin', postal_code: '10115', country: 'DE' },
};

describe('manufacturer add-on payload', () => {
  beforeEach(() => {
    query.mockReset().mockImplementation(async (sql: string) => sql.startsWith('UPDATE orders SET status =')
      ? { affectedRows: 1, rows: [] }
      : sql.startsWith('SELECT * FROM orders')
        ? { rows: [{ id: 'order-1', cart_id: 'cart-1', status: 'submitting_to_manufacturer',
          plate: 'B AB 1234', plate_type: 'standard', plate_color: 'black', quantity: 2,
          total_cents: 1960, customer_email: 'kunde@example.com', delivery_address: address,
          invoice_address: address, selected_addons: [] }] }
        : { affectedRows: 1, rows: [] });
    createManufacturerOrder.mockReset().mockResolvedValue({ ok: true, data: {
      id: 99, deliveries: [], costNetValue: '5.00',
    }, traceId: null });
  });

  it.each([
    [[], [[2, 2]]],
    [['holderScrews'], [[2, 2], [373, 2], [379, 1]]],
    [['warningVest'], [[2, 2], [5, 1]]],
    [['holderScrews', 'warningVest'], [[2, 2], [373, 2], [379, 1], [5, 1]]],
  ] as const)('submits plate plus add-on variants %j without a real API call', async (addOns, expected) => {
    query.mockImplementation(async (sql: string) => sql.startsWith('UPDATE orders SET status =')
      ? { affectedRows: 1, rows: [] }
      : sql.startsWith('SELECT * FROM orders')
        ? { rows: [{ id: 'order-1', cart_id: 'cart-1', status: 'submitting_to_manufacturer',
          plate: 'B AB 1234', plate_type: 'standard', plate_color: 'black', quantity: 2,
          total_cents: 1960, customer_email: 'kunde@example.com', delivery_address: address,
          invoice_address: address, selected_addons: JSON.stringify(addOns) }] }
        : { affectedRows: 1, rows: [] });
    expect((await submitOrderToManufacturer('order-1')).status).toBe('submitted');
    const payload = createManufacturerOrder.mock.calls[0][0];
    expect(payload.items.map((item: { productVariantId: number; quantity: number }) => [item.productVariantId, item.quantity])).toEqual(expected);
    expect(payload.items.slice(1).every((item: { customization: { productType: string } }) => item.customization.productType === 'OTHER')).toBe(true);
  });
});
