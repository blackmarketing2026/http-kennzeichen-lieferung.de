import { ShieldCheck } from 'lucide-react';

type ComplianceNoticeProps = {
  variant?: 'default' | 'compact' | 'footer';
};

export function ComplianceNotice({ variant = 'default' }: ComplianceNoticeProps) {
  return (
    <aside className={`compliance-notice compliance-notice-${variant}`} aria-label="Fertigung nach DIN 74069:2022-10">
      <span className="compliance-notice-icon"><ShieldCheck aria-hidden="true" /></span>
      <div>
        <strong>Gefertigt nach deutschen Vorgaben</strong>
        <p>Unsere Kennzeichenschilder werden nach den geltenden Vorgaben für deutsche Kfz-Kennzeichen gefertigt. Dazu gehören die vorgeschriebenen Maße, das passende Schriftbild und ein reflektierender Kennzeichenrohling nach <b>DIN 74069:2022-10</b>.</p>
      </div>
    </aside>
  );
}
