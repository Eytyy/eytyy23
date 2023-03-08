import { useCallback, useState } from 'react';

export default function useDropdown(
  expand: boolean = false,
  canToggle: boolean = true
) {
  const [visible, setVisible] = useState(expand);

  const toggleMenu = useCallback(() => {
    if (!canToggle) return;
    setVisible((v) => !v);
  }, [canToggle]);

  return { visible, toggle: toggleMenu };
}
