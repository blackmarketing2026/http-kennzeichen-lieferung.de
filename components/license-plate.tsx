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
  seasonStartMonth?: number;
  seasonEndMonth?: number;
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
  const agriculture = type === 'agriculture240' || type === 'agriculture255';
  const suffix = type === 'electric' ? 'E' : type === 'historic' ? 'H' : '';
  const width =
    type === 'agriculture240'
      ? 240
      : type === 'agriculture255'
        ? 255
        : motorcycle
          ? 180
          : 520;
  const height = agriculture ? 130 : motorcycle ? 200 : 110;
  let fields: Field[];
  if (agriculture) {
    const contentLeft = 43;
    const contentWidth = width - contentLeft - 8;
    const bottomWidth = Math.min(
      contentWidth,
      Math.max(120, (letters.length + numbers.length) * 24 + 12),
    );
    const letterWidth =
      (bottomWidth * Math.max(letters.length, 1)) /
      (Math.max(letters.length, 1) + Math.max(numbers.length, 1));
    fields = [
      {
        value: city,
        x: contentLeft,
        y: 7,
        width: contentWidth,
        height: 53,
        fontSize: 69,
      },
      {
        value: letters,
        x: contentLeft + (contentWidth - bottomWidth) / 2,
        y: 67,
        width: letterWidth - 3,
        height: 54,
        fontSize: 68,
      },
      {
        value: numbers,
        x: contentLeft + (contentWidth - bottomWidth) / 2 + letterWidth + 3,
        y: 67,
        width: bottomWidth - letterWidth - 3,
        height: 54,
        fontSize: 68,
      },
    ];
  } else if (motorcycle) {
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
      (available - 46) / weights.reduce((sum, count) => sum + count, 0),
    );
    const total = weights.reduce((sum, count) => sum + count * unit, 0) + 46;
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
      x += field.width + (index === 0 ? 36 : 10);
      return field;
    });
  }
  return { width, height, motorcycle, agriculture, fields };
}

function PlateArtwork({
  value,
  type,
  color = 'black',
  label,
  seasonStartMonth = 4,
  seasonEndMonth = 10,
}: PlateProps & { label?: string }) {
  const id = useId().replace(/:/g, '');
  const {
    width: w,
    height: h,
    motorcycle,
    agriculture,
    fields,
  } = geometry(value, type);
  const ref = (name: string) => `url(#${id}-${name})`;
  const bandWidth = agriculture ? 32 : motorcycle ? 40 : 44;
  const starX = 7 + bandWidth / 2;
  const starY = agriculture ? 25 : motorcycle ? 29 : 32;
  const stickerX = fields[0].x + fields[0].width + 18;
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
        <radialGradient id={`${id}-inspection-sticker`} cx=".32" cy=".22" r=".85">
          <stop stopColor="#fff87a" />
          <stop offset=".72" stopColor="#f5df2b" />
          <stop offset="1" stopColor="#d5b900" />
        </radialGradient>
        <linearGradient id={`${id}-registration-sticker`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#333638" />
          <stop offset=".18" stopColor="#f5f5f1" />
          <stop offset=".42" stopColor="#8b9291" />
          <stop offset=".7" stopColor="#f9f9f4" />
          <stop offset="1" stopColor="#45494a" />
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
          height={agriculture ? 116 : motorcycle ? 87 : 96}
          fill={ref('blue')}
        />
        <g fill="#ffdd00">
          {Array.from({ length: 12 }, (_, index) => {
            const angle = (index * Math.PI) / 6;
            const x = Number((starX + Math.sin(angle) * 12.5).toFixed(4));
            const y = Number((starY - Math.cos(angle) * 12.5).toFixed(4));
            return (
              <use
                key={index}
                href={`#${id}-star`}
                x={x}
                y={y}
              />
            );
          })}
        </g>
        <text
          x={starX}
          y={agriculture ? 111 : motorcycle ? 78 : 88}
          textAnchor="middle"
          fill="#fff"
          fontFamily="Arial, sans-serif"
          fontWeight="500"
          fontSize="25"
        >
          D
        </text>
      </g>
      {!motorcycle && !agriculture && (
        <g aria-hidden="true">
          <g transform={`translate(${stickerX} 31)`}>
            <circle cy=".6" r="15.9" fill="#8a8d88" opacity=".55" />
            <circle r="15.3" fill="#171918" stroke="#e3e5de" strokeWidth=".45" />
            <circle r="13.8" fill={ref('inspection-sticker')} stroke="#252725" strokeWidth=".5" />
            {Array.from({ length: 12 }, (_, index) => {
              const angle = (index * Math.PI) / 6;
              const month = index === 0 ? 12 : 12 - index;
              return (
                <g key={month}>
                  <path d="M0 -13.5V-11.5" transform={`rotate(${index * 30})`} stroke="#161716" strokeWidth="1.1" />
                  <text
                    x={Math.sin(angle) * 10.1}
                    y={-Math.cos(angle) * 10.1 + 1.25}
                    textAnchor="middle"
                    fill="#171817"
                    fontFamily="Arial, sans-serif"
                    fontSize="3.7"
                    fontWeight="800"
                  >
                    {month}
                  </text>
                </g>
              );
            })}
            {Array.from({ length: 4 }, (_, index) => (
              <path key={index} d="M0 -5.8L-2 -8H2Z" transform={`rotate(${index * 90})`} fill="#181a18" />
            ))}
            <circle r="5.8" fill="#f8e445" stroke="#191a18" strokeWidth="1.35" />
            <text y="2.2" textAnchor="middle" fill="#161715" fontFamily="Arial, sans-serif" fontSize="6.8" fontWeight="900">HU</text>
          </g>
          <g transform={`translate(${stickerX} 78)`}>
            <circle cy=".7" r="15.9" fill="#777d7e" opacity=".5" />
            <circle r="15.3" fill="#202323" stroke="#eef0ed" strokeWidth=".4" />
            <circle r="13.8" fill={ref('registration-sticker')} stroke="#343737" strokeWidth=".75" />
            <circle r="11.8" fill="#dedfdb" stroke="#303433" strokeWidth=".75" />
            <text y="-9.8" textAnchor="middle" fill="#222524" fontFamily="Arial, sans-serif" fontSize="2.65" fontWeight="900" letterSpacing=".2">ZULASSUNG</text>
            <text y="12.1" textAnchor="middle" fill="#222524" fontFamily="Arial, sans-serif" fontSize="2.65" fontWeight="900" letterSpacing=".35">BEHÖRDE</text>
            <path d="M-8.7 -1.2l.5 1.2 1.3.1-1 .8.4 1.2-1.2-.7-1.1.7.3-1.2-1-.8 1.3-.1ZM8.7-1.2l.5 1.2 1.3.1-1 .8.4 1.2-1.2-.7-1.1.7.3-1.2-1-.8 1.3-.1Z" fill="#272b2a" />
            <path d="M-7.2-7.2H7.2V2.3C7.2 5.9 3.3 8.1 0 9.2-3.3 8.1-7.2 5.9-7.2 2.3Z" fill="#c72027" stroke="#262929" strokeWidth=".8" />
            <path
              d="M-5 2.7c-.6-1.4-.1-3.2 1.2-4.1L-5-3.5l-1.2.1-.5-1.1 1.1-1.5 1.3-.4 1.5 1.1.8 2c1.7-.9 3.1-.8 4.5-.2 1.4.6 2.4 1.6 2.8 2.9.6-.7.7-1.6.2-2.6 1.9 1.5 1.6 3.8-.2 4.7l-1.2.3.4 2.2 1.3 1.8-1.5.3-2.1-2.8-.7-1.7-2.2.2-1.8 3.9-1.8.1 1.3-4.3-1.2-1.2-1.1 1.6-1.3-.3Z"
              fill="#f7f8f3"
              stroke="#672027"
              strokeWidth=".38"
            />
          </g>
        </g>
      )}
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
        fill={
          color === 'green'
            ? '#08783e'
            : ref(color === 'carbon' ? 'carbon' : 'ink')
        }
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
              {String(seasonStartMonth).padStart(2, '0')}
            </text>
            <path d="M464 55H494" stroke="#111" strokeWidth="1.7" />
            <text x="479" y="81">
              {String(seasonEndMonth).padStart(2, '0')}
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
  const plateValue = props.value.trim();
  const label = plateValue
    ? `Kennzeichenvorschau ${plateValue}${props.type === 'electric' ? ' E' : props.type === 'historic' ? ' H' : ''}${props.type === 'season' ? `, Saison ${String(props.seasonStartMonth ?? 4).padStart(2, '0')} bis ${String(props.seasonEndMonth ?? 10).padStart(2, '0')}` : ''}, Schriftfarbe ${props.color === 'green' ? 'Grün' : props.color === 'carbon' ? 'Carbon' : 'Schwarz'}. Plaketten sind nur eine Illustration.`
    : `Leere Kennzeichenvorschau, Schriftfarbe ${props.color === 'green' ? 'Grün' : props.color === 'carbon' ? 'Carbon' : 'Schwarz'}`;
  const agriculture =
    props.type === 'agriculture240' || props.type === 'agriculture255';
  return (
    <div
      className={`${styles.plate} ${props.type === 'motorcycle' ? styles.motorcycle : ''} ${agriculture ? styles.agriculture : ''} ${className}`}
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
  const { width, height, fields, motorcycle, agriculture } = geometry(
    value,
    type,
  );
  const changes = [onCityChange, onLettersChange, onNumbersChange];
  const labels = ['Ortskürzel', 'Erkennungsbuchstaben', 'Erkennungsnummer'];
  return (
    <div
      className={`${styles.plate} ${styles.editor} ${motorcycle ? styles.motorcycle : ''} ${agriculture ? styles.agriculture : ''}`}
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
