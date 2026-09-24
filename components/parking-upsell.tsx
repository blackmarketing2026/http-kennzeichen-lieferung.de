'use client';

import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import Image from 'next/image';
import { Bike, Check, CircleParking, LoaderCircle, Plus, Trash2, X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { LicensePlate } from '@/components/license-plate';
import { formatPrice, type PlateColor, type PlateType } from '@/config/products';
import styles from './checkout-extras.module.css';

export type UpsellKind = 'parking' | 'bikeRack';

type Props = {
  kind: UpsellKind;
  plate: string;
  plateType: PlateType;
  plateColor: PlateColor;
  priceCents: number;
  selected: boolean;
  busy: boolean;
  disabled: boolean;
  autoOpen?: boolean;
  onChange: (selected: boolean) => Promise<boolean>;
};

const OFFERS = {
  parking: {
    label: 'Parkplatz-Kennzeichen',
    buttonLabel: 'Parkplatzkennzeichen hinzufügen',
    eyebrow: 'Für deinen Stellplatz',
    title: <>Dein Parkplatz trägt<br />dein Kennzeichen.</>,
    description: 'Ergänze ein Schild für deinen Stellplatz',
    image: '/parking-plate.png',
    imageAlt: 'Kennzeichenschild an der Begrenzungsmauer eines privaten Parkplatzes',
    plateStyle: { top: '18%', left: '50%', width: '35.5%' },
    Icon: CircleParking,
    mounting: 'Befestigungsmaterial ist nicht enthalten.',
  },
  bikeRack: {
    label: 'Fahrradträger-Kennzeichen',
    buttonLabel: 'Gepäckträger-Kennzeichen hinzufügen',
    eyebrow: 'Für deinen Fahrradträger',
    title: <>Dein Fahrradträger trägt<br />dein Kennzeichen.</>,
    description: 'Ergänze ein Schild für deinen Fahrrad- oder Gepäckträger',
    image: '/bike-rack-plate.png',
    imageAlt: 'Auto mit Fahrrädern auf einem Heckträger und zusätzlichem Kennzeichenschild',
    plateStyle: { top: '74.5%', left: '50.7%', width: '24%' },
    Icon: Bike,
    mounting: 'Fahrradträger und Befestigungsmaterial sind nicht enthalten.',
  },
} satisfies Record<UpsellKind, {
  label: string;
  buttonLabel: string;
  eyebrow: string;
  title: ReactNode;
  description: string;
  image: string;
  imageAlt: string;
  plateStyle: CSSProperties;
  Icon: typeof CircleParking;
  mounting: string;
}>;

export function PlateUpsell({ kind, plate, plateType, plateColor, priceCents, selected, busy, disabled, autoOpen = false, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const offer = OFFERS[kind];
  const Icon = offer.Icon;

  useEffect(() => {
    if (!autoOpen || selected) return;
    const key = `${kind}-offer:${plate}`;
    const timeout = window.setTimeout(() => {
      try {
        if (sessionStorage.getItem(key)) return;
        sessionStorage.setItem(key, 'shown');
      } catch {
        /* The offer also works when storage is unavailable. */
      }
      setOpen(true);
    }, 600);
    return () => window.clearTimeout(timeout);
  }, [autoOpen, kind, plate, selected]);

  async function change(next: boolean) {
    setError(false);
    if (await onChange(next)) setOpen(false);
    else setError(true);
  }

  return (
    <>
      <div className={`${styles.extraOffer} ${selected ? styles.extraOfferSelected : ''}`}>
        <span className={styles.extraOfferIcon}><Icon size={18} /></span>
        <div>
          <strong>{offer.label}</strong>
          <span>{selected ? `Hinzugefügt · + ${formatPrice(priceCents / 100)}` : `Zusätzlich für ${formatPrice(priceCents / 100)}`}</span>
        </div>
        <button type="button" disabled={disabled || busy} onClick={() => selected ? change(false) : setOpen(true)}>
          {busy ? <LoaderCircle className="spin" size={16} /> : selected ? <Trash2 size={15} /> : <Plus size={16} />}
          {selected ? 'Entfernen' : 'Hinzufügen'}
        </button>
      </div>
      {error && !open && (
        <p role="alert" className={styles.offerError}>
          Der Zusatz konnte nicht geändert werden. Bitte versuche es erneut.{' '}
          <button type="button" onClick={() => setOpen(true)}>Angebot öffnen</button>
        </p>
      )}
      <Dialog open={open} onOpenChange={(value) => { if (!busy) setOpen(value); }}>
        <DialogContent className={styles.offerDialog} showCloseButton={false}>
          <button type="button" className={styles.close} onClick={() => setOpen(false)} disabled={busy} aria-label="Angebot schließen"><X size={20} /></button>
          <div className={styles.offerImage}>
            <Image src={offer.image} alt={offer.imageAlt} width={1536} height={1024} sizes="(max-width: 600px) 92vw, 540px" priority={autoOpen} />
            <LicensePlate value={plate} type={plateType} color={plateColor} className={styles.offerPlate} style={{ position: 'absolute', zIndex: 1, ...offer.plateStyle, transform: 'translateX(-50%)' }} />
            <span>Anwendungsbeispiel</span>
          </div>
          <div className={styles.offerContent}>
            <p className={styles.eyebrow}><Icon size={17} /> {offer.eyebrow}</p>
            <DialogTitle className={styles.offerTitle}>{offer.title}</DialogTitle>
            <DialogDescription className={styles.offerDescription}>
              {offer.description} mit deiner Kombination <strong>{plate}</strong> – in derselben Ausführung wie deine Bestellung.
            </DialogDescription>
            <div className={styles.benefits}>
              <span><Check size={16} /> Gemeinsam geliefert</span>
              <span><Check size={16} /> Keine zusätzlichen Versandkosten</span>
            </div>
            <div className={styles.offerPrice}>
              <strong>+ {formatPrice(priceCents / 100)}</strong>
              <span>inkl. MwSt. · ein zusätzliches Schild</span>
            </div>
            {error && <p role="alert" className={styles.offerError}>Der Zusatz konnte nicht übernommen werden. Bitte versuche es erneut.</p>}
            <button className={styles.addButton} type="button" disabled={disabled || busy} onClick={() => change(true)}>
              {busy ? <LoaderCircle className="spin" size={18} /> : <Plus size={18} />}
              {busy ? 'Wird hinzugefügt …' : `${offer.buttonLabel} · ${formatPrice(priceCents / 100)}`}
            </button>
            <button className={styles.decline} type="button" disabled={busy} onClick={() => setOpen(false)}>Nein, danke – ohne Zusatz fortfahren</button>
            <p className={styles.mounting}>{offer.mounting}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
