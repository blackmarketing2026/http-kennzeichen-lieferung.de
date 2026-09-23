import { describe, expect, it } from 'vitest';
import { renderEmailTemplate } from '@/lib/mail';

describe('customer email template', () => {
  it('displays the shared logo prominently and responsively', () => {
    const html = renderEmailTemplate({
      logoUrl: 'https://www.kennzeichen-lieferung.de/kennzeichen-lieferung-logo.png',
      heading: 'Deine Bestellung',
      bodyHtml: '<p>Vielen Dank!</p>',
    });

    expect(html).toContain('width="360" height="120"');
    expect(html).toContain('max-width:100%;height:auto');
    expect(html).toContain('alt="Kennzeichen-Lieferung"');
  });
});
