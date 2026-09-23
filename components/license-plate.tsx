'use client';

import { useId, useRef, type CSSProperties } from 'react';
import type { PlateColor, PlateType } from '@/config/products';
import styles from './license-plate.module.css';

type PlateProps = {
  value: string;
  type: PlateType;
  color?: PlateColor;
  className?: string;
  style?: CSSProperties;
};
type Field = {
  value: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
};

// One coordinate system keeps the frame, lettering and editable fields aligned.
function geometry(value: string, type: PlateType) {
  const [city = '', letters = '', numbers = ''] = value.split(' ');
  const motorcycle = type === 'motorcycle';
  const suffix = type === 'electric' ? 'E' : type === 'historic' ? 'H' : '';
  const width = motorcycle ? 180 : 520;
  const height = motorcycle ? 200 : 110;
  let fields: Field[];
  if (motorcycle) {
    const bottomWidth = Math.min(
      156,
      Math.max(106, (letters.length + numbers.length) * 27 + 8),
    );
    const letterWidth =
      (bottomWidth * Math.max(letters.length, 1)) /
      (Math.max(letters.length, 1) + Math.max(numbers.length, 1));
    fields = [
      { value: city, x: 53, y: 12, width: 111, height: 64, fontSize: 90 },
      {
        value: letters,
        x: (180 - bottomWidth) / 2,
        y: 133,
        width: letterWidth - 3,
        height: 60,
        fontSize: 88,
      },
      {
        value: numbers,
        x: (180 - bottomWidth) / 2 + letterWidth + 3,
        y: 133,
        width: bottomWidth - letterWidth - 3,
        height: 60,
        fontSize: 88,
      },
    ];
  } else {
    const available = type === 'season' ? 400 : 445;
    const weights = [
      Math.max(city.length, 1),
      Math.max(letters.length, 1),
      Math.max(numbers.length, 1) + (suffix ? 1 : 0),
    ];
    const unit = Math.min(
      48,
      (available - 37) / weights.reduce((sum, count) => sum + count, 0),
    );
    const total = weights.reduce((sum, count) => sum + count * unit, 0) + 37;
    let x = 57 + (available - total) / 2;
    fields = [city, letters, numbers + suffix].map((text, index) => {
      const field = {
        value: text,
        x,
        y: 11,
        width: weights[index] * unit,
        height: 87,
        fontSize: 101,
      };
      x += field.width + (index === 0 ? 27 : 10);
      return field;
    });
  }
  return { width, height, motorcycle, fields };
}

function PlateArtwork({
  value,
  type,
  color = 'black',
  label,
}: PlateProps & { label?: string }) {
  const id = useId().replace(/:/g, '');
  const { width: w, height: h, motorcycle, fields } = geometry(value, type);
  const ref = (name: string) => `url(#${id}-${name})`;
  const bandWidth = motorcycle ? 40 : 44;
  const starX = 7 + bandWidth / 2;
  const starY = motorcycle ? 29 : 32;
  return (
    <svg
      className={styles.artwork}
      viewBox={`0 0 ${w} ${h + 2}`}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-edge`} x1="0" y1="0" x2=".18" y2="1">
          <stop stopColor="#929b9e" />
          <stop offset=".035" stopColor="#fcfdfd" />
          <stop offset=".12" stopColor="#b5babc" />
          <stop offset=".46" stopColor="#f4f5f5" />
          <stop offset=".86" stopColor="#90999c" />
          <stop offset=".97" stopColor="#f6f8f8" />
          <stop offset="1" stopColor="#697275" />
        </linearGradient>
        <linearGradient id={`${id}-face`} x1="0" y1="0" x2=".7" y2="1">
          <stop stopColor="#f3f4f0" />
          <stop offset=".3" stopColor="#fffffc" />
          <stop offset=".65" stopColor="#f7f8f5" />
          <stop offset="1" stopColor="#e6e9e7" />
        </linearGradient>
        <linearGradient id={`${id}-blue`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#0634b4" />
          <stop offset=".48" stopColor="#003aab" />
          <stop offset="1" stopColor="#022c89" />
        </linearGradient>
        <linearGradient id={`${id}-ink`} x1="0" y1="0" x2=".15" y2="1">
          <stop stopColor="#303332" />
          <stop offset=".12" stopColor="#090c0b" />
          <stop offset=".6" stopColor="#111412" />
          <stop offset="1" stopColor="#020403" />
        </linearGradient>
        <pattern
          id={`${id}-grain`}
          width="2.3"
          height="2.3"
          patternUnits="userSpaceOnUse"
        >
          <circle cx=".4" cy=".4" r=".16" fill="#727d76" opacity=".12" />
          <circle cx="1.5" cy="1.4" r=".22" fill="#fff" opacity=".65" />
        </pattern>
        <pattern
          id={`${id}-carbon`}
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <rect width="4" height="4" fill="#131817" />
          <path d="M0 0H2V2H4V4H2V2H0Z" fill="#424846" />
        </pattern>
        <filter
          id={`${id}-emboss`}
          x="-12%"
          y="-12%"
          width="124%"
          height="130%"
          colorInterpolationFilters="sRGB"
        >
          <feDropShadow
            dx="0"
            dy="1.1"
            stdDeviation=".45"
            floodColor="#38413c"
            floodOpacity=".6"
          />
          <feDropShadow
            dx="-.45"
            dy="-.45"
            stdDeviation=".12"
            floodColor="#fff"
            floodOpacity=".95"
          />
        </filter>
        <clipPath id={`${id}-faceClip`}>
          <rect x="6.5" y="6.5" width={w - 13} height={h - 13} rx="5" />
        </clipPath>
        <path
          id={`${id}-star`}
          d="M0 -2.1 .5 -.65 2 -.65 .8 .25 1.25 1.8 0 .9 -1.25 1.8 -.8 .25 -2 -.65 -.5 -.65Z"
        />
      </defs>
      <rect
        x=".8"
        y="2.7"
        width={w - 1.6}
        height={h - 1.8}
        rx="9"
        fill="#7b8385"
      />
      <rect
        x=".8"
        y=".8"
        width={w - 1.6}
        height={h - 1.6}
        rx="9"
        fill={ref('edge')}
        stroke="#778084"
        strokeWidth=".65"
      />
      <rect
        x="3"
        y="3"
        width={w - 6}
        height={h - 6}
        rx="7"
        fill={ref('face')}
        stroke="#fff"
        strokeWidth="1"
      />
      <g clipPath={ref('faceClip')}>
        <rect x="6" y="6" width={w - 12} height={h - 12} fill={ref('grain')} />
        <rect
          x="7"
          y="7"
          width={bandWidth}
          height={motorcycle ? 87 : 96}
          fill={ref('blue')}
        />
        <g fill="#ffdd00">
          {Array.from({ length: 12 }, (_, index) => {
            const angle = (index * Math.PI) / 6;
            return (
              <use
                key={index}
                href={`#${id}-star`}
                x={starX + Math.sin(angle) * 12.5}
                y={starY - Math.cos(angle) * 12.5}
              />
            );
          })}
        </g>
        <text
          x={starX}
          y={motorcycle ? 78 : 88}
          textAnchor="middle"
          fill="#fff"
          fontFamily="Arial, sans-serif"
          fontWeight="500"
          fontSize="25"
        >
          D
        </text>
      </g>
      <rect
        x="5.4"
        y="5.4"
        width={w - 10.8}
        height={h - 10.8}
        rx="5.7"
        fill="none"
        stroke="#929993"
        strokeWidth="3.2"
      />
      <rect
        x="5.9"
        y="6.1"
        width={w - 11.8}
        height={h - 11.8}
        rx="5.1"
        fill="none"
        stroke="#fff"
        strokeWidth="2.5"
      />
      <rect
        x="5.5"
        y="5.5"
        width={w - 11}
        height={h - 11}
        rx="5.5"
        fill="none"
        stroke="#151918"
        strokeWidth="2.3"
      />
      <g
        className={styles.lettering}
        fill={ref(color === 'carbon' ? 'carbon' : 'ink')}
        filter={ref('emboss')}
      >
        {fields.map((field, index) => (
          <text
            key={index}
            data-field={index}
            x={field.x + field.width / 2}
            y={field.y + field.height * 0.81}
            fontSize={field.fontSize}
            textAnchor="middle"
            textLength={Math.max(
              1,
              Math.min(
                field.width - 2,
                field.value.length * field.fontSize * 0.48,
              ),
            )}
            lengthAdjust="spacingAndGlyphs"
          >
            {field.value}
          </text>
        ))}
        {type === 'season' && (
          <g fontSize="27" textAnchor="middle">
            <text x="479" y="47">
              04
            </text>
            <path d="M464 55H494" stroke="#111" strokeWidth="1.7" />
            <text x="479" y="81">
              10
            </text>
          </g>
        )}
      </g>
      <path
        d={`M12 2.3H${w - 12}`}
        stroke="#fff"
        strokeWidth=".7"
        opacity=".8"
      />
    </svg>
  );
}

export function LicensePlate({ className = '', style, ...props }: PlateProps) {
  const label = `Kennzeichenvorschau ${props.value}${props.type === 'electric' ? ' E' : props.type === 'historic' ? ' H' : ''}${props.type === 'season' ? ', Saison April bis Oktober' : ''}, Schriftfarbe ${props.color === 'carbon' ? 'Carbon' : 'Schwarz'}`;
  return (
    <div
      className={`${styles.plate} ${props.type === 'motorcycle' ? styles.motorcycle : ''} ${className}`}
      style={style}
    >
      <PlateArtwork {...props} label={label} />
    </div>
  );
}

type EditorProps = {
  city: string;
  letters: string;
  numbers: string;
  type: PlateType;
  color: PlateColor;
  onCityChange: (value: string) => void;
  onLettersChange: (value: string) => void;
  onNumbersChange: (value: string) => void;
};

export function LicensePlateEditor({
  city,
  letters,
  numbers,
  type,
  color,
  onCityChange,
  onLettersChange,
  onNumbersChange,
}: EditorProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const value = `${city} ${letters} ${numbers}`;
  const { width, height, fields, motorcycle } = geometry(value, type);
  const changes = [onCityChange, onLettersChange, onNumbersChange];
  const labels = ['Ortskürzel', 'Erkennungsbuchstaben', 'Erkennungsnummer'];
  return (
    <div
      className={`${styles.plate} ${styles.editor} ${motorcycle ? styles.motorcycle : ''}`}
    >
      <PlateArtwork value={value} type={type} color={color} />
      {fields.map((field, index) => (
        <input
          key={index}
          ref={(element) => {
            refs.current[index] = element;
          }}
          className={styles.input}
          data-field={index}
          aria-label={labels[index]}
          value={[city, letters, numbers][index]}
          maxLength={[3, 2, 4][index]}
          autoComplete="off"
          spellCheck={false}
          inputMode={index === 2 ? 'numeric' : 'text'}
          style={{
            fontSize: `${(Math.min(field.fontSize, field.width / Math.max(field.value.length, 1) / 0.48) / width) * 100}cqw`,
            left: `${(field.x / width) * 100}%`,
            top: `${(field.y / (height + 2)) * 100}%`,
            width: `${(field.width / width) * 100}%`,
            height: `${(field.height / (height + 2)) * 100}%`,
          }}
          onChange={(event) => {
            changes[index](event.target.value);
          }}
          onKeyDown={(event) => {
            if (
              event.key === 'Backspace' &&
              !event.currentTarget.value &&
              index > 0
            )
              refs.current[index - 1]?.focus();
          }}
        />
      ))}
    </div>
  );
}
