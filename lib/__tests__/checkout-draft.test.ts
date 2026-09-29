import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  checkoutReturnPath,
  readCheckoutDraft,
  saveCheckoutDraft,
} from '@/lib/checkout-draft';

afterEach(() => vi.unstubAllGlobals());

function useSessionStorage() {
  const values = new Map<string, string>();
  vi.stubGlobal('window', {
    sessionStorage: {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
    },
  });
  return values;
}

describe('checkout draft', () => {
  it('restores a plate and selected type after leaving the checkout', () => {
    useSessionStorage();
    saveCheckoutDraft('kennzeichen-bestellen', {
      plate: 'B AB 1234',
      plateType: 'electric',
      plateColor: 'black',
      quantity: 2,
    });

    expect(readCheckoutDraft('kennzeichen-bestellen')).toMatchObject({
      plate: 'B AB 1234',
      plateType: 'electric',
      quantity: 2,
    });
    expect(readCheckoutDraft('home')).toBeNull();
    expect(checkoutReturnPath('kennzeichen-bestellen')).toBe(
      '/kennzeichen-bestellen#konfigurator',
    );
  });

  it('restores the dealer code and land-machine color independently', () => {
    useSessionStorage();
    saveCheckoutDraft('autohaendlerpartner', {
      plate: 'B AB 1234',
      plateType: 'standard',
      plateColor: 'black',
      quantity: 2,
      promoCode: 'PARTNER',
    });
    saveCheckoutDraft('landmaschinen-kennzeichen', {
      plate: 'B AB 123',
      plateType: 'agriculture240',
      plateColor: 'green',
      quantity: 1,
    });

    expect(readCheckoutDraft('autohaendlerpartner')?.promoCode).toBe('PARTNER');
    expect(readCheckoutDraft('landmaschinen-kennzeichen')?.plateColor).toBe(
      'green',
    );
    expect(checkoutReturnPath('autohaendlerpartner')).toBe(
      '/autohaendlerpartner#bestellen',
    );
  });

  it('ignores a damaged saved draft', () => {
    const values = useSessionStorage();
    values.set('kennzeichen-checkout-draft:home', '{invalid');
    expect(readCheckoutDraft('home')).toBeNull();
  });
});
