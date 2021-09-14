import React from 'react';
import { Pos, classNames } from './tools';

export interface BirdProps {
  pos: Pos;
  interactive: boolean;
  onMouseDown: () => void;
}

const Bird: React.FC<BirdProps> = props => {
  const { pos, interactive, onMouseDown } = props;

  return (
    <circle
      className={classNames('bird', { interactive })}
      onMouseDown={onMouseDown}
      cx={pos.x}
      cy={pos.y}
      r="13"
    />
  );
};

export default Bird;
