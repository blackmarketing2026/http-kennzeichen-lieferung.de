import type { Gender, ManufacturerOrderPayload } from '@/lib/kennzeichen-api';

export type KennzeichenTestInput = {
  externalId: string;
  productVariantId: number;
  productName: string;
  sku: string;
  quantity: number;
  email: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  street: string;
  houseNumber: string;
  zipCode: string;
  city: string;
  phone: string;
  plateCity: string;
  plateMiddle: string;
  plateEnd: string;
};

const EXTERNAL_ID_RE = /^[A-Za-z0-9_-]{1,191}$/;
const EMAIL_RE = /^\S+@\S+\.\S+$/;
const PLATE_CITY_RE = /^[A-ZÄÖÜ]{1,3}$/;
const PLATE_MIDDLE_RE = /^[A-Z]{1,2}$/;
const PLATE_END_RE = /^[1-9]\d{0,3}$/;
const GENDERS: Gender[] = ['FEMALE', 'MALE', 'UNSPECIFIED'];

export type BuildResult = { ok: true; payload: ManufacturerOrderPayload } | { ok: false; error: string };

/** Validates raw admin-supplied test-order fields and assembles the exact payload sent to the manufacturer API. */
export function buildKennzeichenTestPayload(input: KennzeichenTestInput): BuildResult {
  const externalId = input.externalId?.trim() ?? '';
  const productName = input.productName?.trim() ?? '';
  const sku = input.sku?.trim() ?? '';
  const email = input.email?.trim() ?? '';
  const firstName = input.firstName?.trim() ?? '';
  const lastName = input.lastName?.trim() ?? '';
  const street = input.street?.trim() ?? '';
  const houseNumber = input.houseNumber?.trim() ?? '';
  const zipCode = input.zipCode?.trim() ?? '';
  const city = input.city?.trim() ?? '';
  const phone = input.phone?.trim() ?? '';
  const plateCity = (input.plateCity ?? '').trim().toUpperCase();
  const plateMiddle = (input.plateMiddle ?? '').trim().toUpperCase();
  const plateEnd = (input.plateEnd ?? '').trim();

  if (!EXTERNAL_ID_RE.test(externalId)) return { ok: false, error: 'Externe Bestellnummer fehlt oder enthält ungültige Zeichen.' };
  if (!Number.isInteger(input.productVariantId) || input.productVariantId <= 0) {
    return { ok: false, error: 'Produktvarianten-ID muss eine positive ganze Zahl sein.' };
  }
  if (!productName) return { ok: false, error: 'Produktname fehlt.' };
  if (!sku) return { ok: false, error: 'SKU fehlt.' };
  if (!Number.isInteger(input.quantity) || input.quantity < 1) return { ok: false, error: 'Menge muss mindestens 1 sein.' };
  if (!EMAIL_RE.test(email)) return { ok: false, error: 'E-Mail-Adresse ist ungültig.' };
  if (!GENDERS.includes(input.gender)) return { ok: false, error: 'Anrede ist ungültig.' };
  if (!firstName || !lastName || !street || !houseNumber || !zipCode || !city) {
    return { ok: false, error: 'Bitte alle Adressfelder ausfüllen.' };
  }
  if (!PLATE_CITY_RE.test(plateCity)) return { ok: false, error: 'Ortskürzel ungültig (1–3 Großbuchstaben, z. B. OL).' };
  if (!PLATE_MIDDLE_RE.test(plateMiddle)) return { ok: false, error: 'Buchstabenkombination ungültig (1–2 Großbuchstaben, z. B. FC).' };
  if (!PLATE_END_RE.test(plateEnd)) return { ok: false, error: 'Zahlenkombination ungültig (1–4 Ziffern, nicht mit 0 beginnend, z. B. 105).' };

  const address = {
    firstName: firstName.slice(0, 100),
    lastName: lastName.slice(0, 100),
    gender: input.gender,
    streetName: street.slice(0, 100),
    houseNumber: houseNumber.slice(0, 10),
    zipCode: zipCode.slice(0, 12),
    cityName: city.slice(0, 100),
    countryCode: 'DE' as const,
    ...(phone ? { phoneNumber: phone.slice(0, 20) } : {}),
  };

  const payload: ManufacturerOrderPayload = {
    externalId,
    email,
    deliveryAddress: address,
    invoiceAddress: address,
    items: [
      {
        productVariantId: input.productVariantId,
        name: productName,
        sku,
        quantity: input.quantity,
        customization: {
          productType: 'LICENSE_PLATE',
          licensePlateNumberComponents: { usageType: 'EURO', city: plateCity, middle: plateMiddle, end: plateEnd },
        },
      },
    ],
  };

  return { ok: true, payload };
}

export function generateTestExternalId() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).slice(2, 10);
  return `TEST-${date}-${random}`;
}
