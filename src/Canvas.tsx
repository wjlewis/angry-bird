import React from 'react';
import { StateContext, Selectors as S, Actions as A } from './state';
import { useBounds, useMouse } from './hooks';
import { Pos } from './tools';
import Bird from './Bird';
import SlingShot from './SlingShot';

const Canvas: React.VFC = () => {
  const { state, dispatch } = React.useContext(StateContext);
  const ref = React.useRef(null);
  const bounds = useBounds(ref, bounds => dispatch(A.updateBounds(bounds)));

  const { width: w, height: h } = bounds;
  const transform = `translate(${w / 2} ${h}) scale(1 -1)`;

  useMouse(bounds, {
    onMove: pos =>
      dispatch(A.mouseMove(new Pos(pos.x - w / 2, h - pos.y).toPc(w, h))),
    onUp: () => dispatch(A.mouseUp()),
  });

  function handleMouseDown() {
    return dispatch(A.mouseDownBird());
  }

  const launchPos = S.launchPos(state);
  const birdPos = S.birdPos(state);
  const sling = S.sling(state);
  const trajectoryPath = S.trajectoryPath(state);
  const canInteract = S.canInteract(state);

  return (
    <svg className="canvas" ref={ref}>
      <g transform={transform}>
        <SlingShot launchPos={launchPos} slingPos={sling} />

        {/* A graph of the trajectory, rendered using a quadratic bezier curve */}
        <path className="trajectory" d={trajectoryPath} />

        <Bird
          pos={birdPos}
          interactive={canInteract}
          onMouseDown={handleMouseDown}
        />
      </g>
    </svg>
  );
};

export default Canvas;
