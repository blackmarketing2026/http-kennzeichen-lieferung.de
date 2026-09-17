import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { MANUFACTURER_VARIANTS, getManufacturerVariant } from '@/config/manufacturer-products';
import { isValidPlate } from '@/config/products';
import { parsePlate, toManufacturerAddress } from '@/lib/manufacturer-order';
import { maskSecrets } from '@/lib/logger';

function loadCatalogRows() {
  const csv = readFileSync(path.resolve(__dirname, '../../Produktkatalog.csv'), 'utf8');
  return csv
    .trim()
    .split('\n')
    .slice(1)
    .map((line) => {
      const cols = line.split(';').map((value) => value.replace(/^"|"$/g, ''));
      return {
        productType: cols[0],
        name: cols[1],
        productVariantId: Number(cols[2]),
        sku: cols[3],
        licensePlateNumberLength: cols[9] ? Number(cols[9]) : null,
      };
    });
}

describe('manufacturer product mapping', () => {
  const catalog = loadCatalogRows();

  it('every configured variant exists in Produktkatalog.csv with matching id, sku and length', () => {
    for (const [plateType, colors] of Object.entries(MANUFACTURER_VARIANTS)) {
      for (const [color, variant] of Object.entries(colors)) {
        const row = catalog.find((entry) => entry.productVariantId === variant.productVariantId);
        expect(row, `${plateType}/${color}: productVariantId ${variant.productVariantId} missing from catalog`).toBeDefined();
        expect(row?.sku).toBe(variant.sku);
        expect(row?.name).toBe(variant.name);
        expect(row?.productType).toBe('LICENSE_PLATE');
        expect(row?.licensePlateNumberLength).toBe(variant.maxLength);
      }
    }
  });

  it('rejects a plate that exceeds the maximum length for the chosen variant', () => {
    const variant = getManufacturerVariant('standard', 'black');
    const tooLong = 'AB CD 123456'; // exceeds maxLength 8 once spaces are stripped
    expect(isValidPlate(tooLong, 'standard')).toBe(false);
    expect('ABCD123456'.length).toBeGreaterThan(variant.maxLength);
  });
});

describe('parsePlate', () => {
  it('splits a German plate into city/middle/end components', () => {
    expect(parsePlate('HB SJ 1991')).toEqual({ city: 'HB', middle: 'SJ', end: '1991' });
  });

  it('returns null for an unparseable plate', () => {
    expect(parsePlate('not a plate')).toBeNull();
  });
});

describe('toManufacturerAddress', () => {
  it('splits Stripe shipping details into first/last name and street/house number', () => {
    const address = toManufacturerAddress({
      name: 'Max Mustermann',
      phone: '+491701234567',
      address: { line1: 'Musterstraße 12a', city: 'Berlin', postal_code: '12345', country: 'DE' },
    });
    expect(address).toEqual({
      firstName: 'Max',
      lastName: 'Mustermann',
      gender: 'UNSPECIFIED',
      streetName: 'Musterstraße',
      houseNumber: '12a',
      zipCode: '12345',
      cityName: 'Berlin',
      countryCode: 'DE',
      phoneNumber: '+491701234567',
    });
  });

  it('returns null when required fields are missing', () => {
    expect(toManufacturerAddress(null)).toBeNull();
    expect(toManufacturerAddress({ name: 'Max Mustermann', address: { city: 'Berlin' } })).toBeNull();
  });
});

describe('maskSecrets', () => {
  it('masks authorization headers, passwords and signatures but keeps other fields', () => {
    const masked = maskSecrets({
      endpoint: '/orders',
      headers: { Authorization: 'Basic abc123', 'X-Signature': 'deadbeef' },
      password: 'geheim',
      httpStatus: 201,
    }) as Record<string, unknown>;
    expect((masked.headers as Record<string, unknown>).Authorization).toBe('***');
    expect((masked.headers as Record<string, unknown>)['X-Signature']).toBe('***');
    expect(masked.password).toBe('***');
    expect(masked.httpStatus).toBe(201);
    expect(masked.endpoint).toBe('/orders');
  });
});
