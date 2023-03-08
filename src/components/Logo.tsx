import React from 'react';

type Props = {};

export default function Logo({}: Props) {
  return (
    <svg viewBox="0 0 624 144" className="w-full max-w-[100px]">
      <g>
        <path
          className="fill-pageText"
          d="m0,0v144h67.2v-28.8h38.4V0H0Zm76.8,72H28.8V24h48v48Z"
        />
        <polygon
          className="fill-pageText"
          points="206.4 0 206.4 72 158.4 72 158.4 0 129.6 0 129.6 115.2 168 115.2 168 144 235.2 144 235.2 0 206.4 0"
        />
        <polygon
          className="fill-pageText"
          points="465.6 0 465.6 72 416.53 72 416.53 0 388.27 0 388.27 115.2 426.67 115.2 426.67 144 493.87 144 493.87 0 465.6 0"
        />
        <polygon
          className="fill-pageText"
          points="595.2 0 595.2 72 547.2 72 547.2 0 518.4 0 518.4 115.2 556.8 115.2 556.8 144 624 144 624 0 595.2 0"
        />
        <polygon
          className="fill-pageText"
          points="259.2 0 259.2 115.2 297.6 115.2 297.6 144 326.4 144 326.4 115.2 364.8 115.2 364.8 0 259.2 0"
        />
      </g>
    </svg>
  );
}
