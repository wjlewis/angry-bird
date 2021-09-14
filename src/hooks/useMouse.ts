import React from 'react';
import { Pos } from '../tools';
import { Bounds } from './useBounds';

export function useMouse(bounds: Bounds, handlers: UseMouseHandlers) {
  React.useLayoutEffect(() => {
    function handleMove(e: MouseEvent) {
      const { clientX, clientY } = e;
      const { left, top } = bounds;
      handlers.onMove(new Pos(clientX - left, clientY - top));
    }

    function handleUp() {
      handlers.onUp();
    }

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
    };
  }, [bounds, handlers]);
}

export interface UseMouseHandlers {
  onMove: (pos: Pos) => void;
  onUp: () => void;
}
