import React from 'react';
import { StateContext, Actions as A, Selectors as S } from './state';

const Controls: React.VFC = () => {
  const { state, dispatch } = React.useContext(StateContext);

  function handleReset() {
    return dispatch(A.reset());
  }

  return (
    <nav id="controls">
      <button onClick={handleReset} disabled={!S.canReset(state)}>
        Reset
      </button>
    </nav>
  );
};

export default Controls;
