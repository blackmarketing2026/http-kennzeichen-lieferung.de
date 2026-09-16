import type { CSSProperties } from 'react';
import type { PlateColor, PlateType } from '@/config/products';

type LicensePlateProps = { value: string; type: PlateType; color?: PlateColor; className?: string; style?: CSSProperties };
const stars = Array.from({ length: 12 });

export function PlateSeals({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`plate-seals ${compact ? 'is-compact' : ''}`} aria-hidden="true">
      <i className="hu-seal"><span>12</span><b>26</b><small>HU</small></i>
      <i className="registration-seal"><span>MUSTER</span><b>DE</b><small>ZULASSUNG</small></i>
    </span>
  );
}

export function LicensePlate({ value, type, color = 'black', className = '', style }: LicensePlateProps) {
  const [city = 'OL', letters = 'AB', numbers = '123'] = value.trim().split(/\s+/);
  const suffix = type === 'electric' ? 'E' : type === 'historic' ? 'H' : '';
  return (
    <div className={`license-plate ${type === 'motorcycle' ? 'is-motorcycle' : ''} ${color === 'carbon' ? 'is-carbon' : ''} ${className}`} style={style} aria-label={`Kennzeichenvorschau ${value}${suffix ? ` ${suffix}` : ''}, Schriftfarbe ${color === 'carbon' ? 'Carbon' : 'Schwarz'}`}>
      <div className="plate-blue">
        <span className="eu-stars" aria-hidden="true">
          {stars.map((_, index) => <i key={index} style={{ '--star': index } as CSSProperties}>★</i>)}
        </span>
        <b>D</b>
      </div>
      <div className="plate-copy" aria-hidden="true">
        {type === 'motorcycle' ? (
          <><span className="plate-city">{city || 'OL'}</span><span className="plate-line-two">{letters || 'AB'} {numbers || '123'}</span></>
        ) : (
          <><span>{city || 'OL'}</span><PlateSeals /><span>{letters || 'AB'}</span><span>{numbers || '123'}</span>{suffix && <span className="plate-suffix">{suffix}</span>}{type === 'season' && <span className="season-mark"><b>04</b><i /><b>10</b></span>}</>
        )}
      </div>
      <span className="plate-shine" aria-hidden="true" />
    </div>
  );
}
