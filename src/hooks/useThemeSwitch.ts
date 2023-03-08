import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const themes = {
  black: {
    title: 'Black Mode',
    name: 'black',
    color: { hex: '#000' },
  },
  blue: {
    title: 'Blue Mode',
    name: 'blue',
    color: { hex: '#00F' },
  },
  white: {
    title: 'White Mode',
    name: 'metal',
    color: { hex: '#FFF' },
  },
};

export const themes_names = ['black', 'white', 'blue'] as const;

export default function useThemeSwitch() {
  const hasMounted = useHasMounted();
  const { theme, setTheme } = useTheme();

  if (!hasMounted || !theme) return null;

  const currentTheme = theme
    ? themes[theme as 'black' | 'white' | 'blue']
    : themes.black;
  const updateTheme = (name: 'black' | 'blue' | 'white') =>
    setTheme(themes[name].name);

  return {
    theme: currentTheme,
    setTheme: updateTheme,
  };
}

export function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
}

type Props = {};
