import React from 'react';
import { Pos } from './tools';

export interface SlingShotProps {
  launchPos: Pos;
  slingPos?: Pos;
}

const SlingShot: React.FC<SlingShotProps> = props => {
  const { launchPos, slingPos } = props;

  return (
    <g className="sling-shot">
      <line x1={launchPos.x} y1="0" x2={launchPos.x} y2={launchPos.y} />
      {slingPos && (
        <line
          x1={launchPos.x}
          y1={launchPos.y}
          x2={slingPos.x}
          y2={slingPos.y}
        />
      )}
    </g>
  );
};

export default SlingShot;
