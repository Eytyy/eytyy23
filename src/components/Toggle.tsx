import React from 'react';
import { motion } from 'framer-motion';
import { PiEyeClosedBold, PiEyeBold } from 'react-icons/pi';
import { IconContext } from 'react-icons';
type Props = {
  onToggle: () => void;
  value: 'on' | 'off';
};

export default function ToggleButton({ onToggle, value }: Props) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onToggle}
        className="h-10 w-20 rounded-full bg-pageText"
      >
        <motion.div
          className="relative left-[2px] h-9 w-9 rounded-full bg-pageBG shadow-lg"
          animate={value === 'off' ? { x: 0 } : { x: 40 }}
          transition={{ duration: 0.2 }}
        />
      </button>
      <IconContext.Provider
        value={{
          size: '2rem',
          className: 'text-pageText',
        }}
      >
        {value === 'off' ? <PiEyeBold /> : <PiEyeClosedBold />}
      </IconContext.Provider>
    </div>
  );
}
