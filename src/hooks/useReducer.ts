import React from 'react';

export function useReducer<St, A>(
  reducer: React.Reducer<St, A>,
  initState: St,
  ...middlewares: Middleware<St, A>[]
): [St, React.Dispatch<A>] {
  let [state, dispatch] = React.useReducer(reducer, initState);

  middlewares = [...middlewares];
  middlewares.reverse();
  middlewares.forEach(mw => {
    dispatch = mw(state, dispatch);
  });

  return [state, dispatch];
}

export interface Middleware<St, A> {
  (state: St, dispatch: React.Dispatch<A>): React.Dispatch<A>;
}
