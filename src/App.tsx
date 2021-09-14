import React from 'react';
import { StateContext, reducer, initState } from './state';
import { animate } from './middleware';
import { useReducer } from './hooks';
import Canvas from './Canvas';
import Controls from './Controls';

const App: React.VFC = () => {
  const [state, dispatch] = useReducer(reducer, initState, animate());

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <main>
        <Canvas />
        <Controls />
      </main>
    </StateContext.Provider>
  );
};

export default App;
