import React, { useEffect } from 'react'


export default function useResizeAppHeight() {
  // Update window inner height in a css variable. This is a workaround
  // to avoid problems caused by the toolbar on mobile browsers
  // when elements have a full viewport height.
  useEffect(() => {
    const appHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty(
        '--app-height',
        `${window.innerHeight}px`
      );
    };
    appHeight();

    window.addEventListener('resize', appHeight);
    return function cleanup() {
      window.removeEventListener('resize', appHeight);
    };
  }, []);
}
