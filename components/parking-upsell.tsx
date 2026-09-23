'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Check, CircleParking, LoaderCircle, Plus, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatPrice } from '@/config/products';
import styles from './checkout-extras.module.css';

type Props = {
  plate: string;
  priceCents: number;
  selected: boolean;
  busy: boolean;
  disabled: boolean;
  onChange: (selected: boolean) => Promise<boolean>;
};

export function ParkingUpsell({
  plate,
  priceCents,
  selected,
  busy,
  disabled,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (selected) return;
    const key = `parking-offer:${plate}`;
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
  }, [plate, selected]);

  async function change(next: boolean) {
    setError(false);
    if (await onChange(next)) setOpen(false);
    else setError(true);
  }

  return (
    <>
      {selected && (
        <div className={styles.selectedExtra}>
          <span>Parkplatz-Kennzeichen · + {formatPrice(priceCents / 100)}</span>
          <button
            type="button"
            disabled={disabled || busy}
            onClick={() => change(false)}
          >
            {busy ? <LoaderCircle className="spin" size={17} /> : 'Entfernen'}
          </button>
        </div>
      )}
      {error && !open && (
        <p role="alert" className={styles.offerError}>
          Der Zusatz konnte nicht geändert werden. Bitte versuche es erneut.{' '}
          <button type="button" onClick={() => setOpen(true)}>
            Angebot öffnen
          </button>
        </p>
      )}
      <Dialog
        open={open}
        onOpenChange={(value) => {
          if (!busy) setOpen(value);
        }}
      >
        <DialogContent className={styles.offerDialog} showCloseButton={false}>
          <button
            type="button"
            className={styles.close}
            onClick={() => setOpen(false)}
            disabled={busy}
            aria-label="Angebot schließen"
          >
            <X size={20} />
          </button>
          <div className={styles.offerImage}>
            <Image
              src="/parking-plate.png"
              alt="Ein Kennzeichenschild ist an der Begrenzungsmauer eines privaten Parkplatzes befestigt"
              width={1536}
              height={1024}
              sizes="(max-width: 600px) 92vw, 540px"
              priority
            />
            <span>Anwendungsbeispiel</span>
          </div>
          <div className={styles.offerContent}>
            <p className={styles.eyebrow}>
              <CircleParking size={17} /> Für deinen Stellplatz
            </p>
            <DialogTitle className={styles.offerTitle}>
              Dein Parkplatz trägt
              <br />
              dein Kennzeichen.
            </DialogTitle>
            <DialogDescription className={styles.offerDescription}>
              Ergänze ein drittes Schild mit deiner Kombination{' '}
              <strong>{plate}</strong> – in derselben Ausführung wie deine
              Bestellung.
            </DialogDescription>
            <div className={styles.benefits}>
              <span>
                <Check size={16} /> Gemeinsam geliefert
              </span>
              <span>
                <Check size={16} /> Keine zusätzlichen Versandkosten
              </span>
            </div>
            <div className={styles.offerPrice}>
              <strong>+ {formatPrice(priceCents / 100)}</strong>
              <span>inkl. MwSt. · ein zusätzliches Schild</span>
            </div>
            {error && (
              <p role="alert" className={styles.offerError}>
                Der Zusatz konnte nicht übernommen werden. Bitte versuche es
                erneut.
              </p>
            )}
            <button
              className={styles.addButton}
              type="button"
              disabled={disabled || busy}
              onClick={() => change(true)}
            >
              {busy ? (
                <LoaderCircle className="spin" size={18} />
              ) : (
                <Plus size={18} />
              )}
              {busy
                ? 'Wird hinzugefügt …'
                : `Für ${formatPrice(priceCents / 100)} hinzufügen`}
            </button>
            <button
              className={styles.decline}
              type="button"
              disabled={busy}
              onClick={() => setOpen(false)}
            >
              Nein, danke – ohne Zusatz fortfahren
            </button>
            <p className={styles.mounting}>
              Befestigungsmaterial ist nicht enthalten.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
