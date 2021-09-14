import React from 'react';
import { Middleware } from '../hooks';
import { State, Actions as A, Selectors as S } from '../state';

// If the user releases the mouse and the conditions are right (i.e. they
// were interacting with the bird), we switch modes and run the animation.
export function animate(): Middleware<State, A.Action> {
  return (state: State, dispatch: React.Dispatch<A.Action>) => {
    return (action: A.Action) => {
      if (action.type === A.ActionType.MouseUp && S.readyToLaunch(state)) {
        dispatch(A.launch());
        run(S.animDuration(state), dispatch);
      }

      dispatch(action);
    };
  };
}

// Dispatch an action to update the current time (in seconds) with each
// repaint. Note that since the user has no way of pausing or stopping the
// animation, we don't need to keep track of the `requestAnimationFrame`
// handle, as we normally would.
function run(duration: number, dispatch: React.Dispatch<A.Action>) {
  let start: number;

  function step(timestamp: number) {
    if (!start) {
      start = timestamp;
    }

    const frame = timestamp - start;
    const time = frame / 1000;
    if (time >= duration) {
      dispatch(A.completeAnim(duration));
    } else {
      requestAnimationFrame(step);
      dispatch(A.updateAnim(time));
    }
  }

  requestAnimationFrame(step);
  dispatch(A.updateAnim(0));
}
