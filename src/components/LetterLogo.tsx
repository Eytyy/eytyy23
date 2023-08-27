import React from 'react';

type Props = {};

export default function LetterLogo({}: Props) {
  return (
    <svg viewBox="0 0 66 90" className="h-full max-h-8 w-auto">
      <g>
        <path
          className="fill-pageText"
          d="m0,0v90h42v-18h24V0H0Zm48,45h-30V15h30v30Z"
        />
      </g>
    </svg>
  );
}
