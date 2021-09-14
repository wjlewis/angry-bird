import React from 'react';

export function useBounds<T extends SVGElement>(
  ref: React.RefObject<T>,
  onChange: (bounds: Bounds) => void
): Bounds {
  const [bounds, setBounds] = React.useState({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  });

  const handler = React.useRef(onChange);

  const recompute = React.useCallback(() => {
    if (!ref.current) {
      return;
    }

    const { width, height, left, top } = ref.current.getBoundingClientRect();
    setBounds({ width, height, left, top });
    handler.current({ width, height, left, top });
  }, [ref, handler]);

  React.useLayoutEffect(() => {
    recompute();

    window.addEventListener('resize', recompute);
    return () => window.removeEventListener('resize', recompute);
  }, [recompute]);

  return bounds;
}

export interface Bounds {
  width: number;
  height: number;
  left: number;
  top: number;
}
