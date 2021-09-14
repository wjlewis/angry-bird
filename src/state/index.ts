import React from 'react';
import { Pos } from '../tools';
import { Bounds } from '../hooks';
import { Action } from './actions';

export * from './reducer';
export * as Actions from './actions';
export * as Selectors from './selectors';

export interface State {
  bounds: Bounds;
  birdPos: Pos;
  dragSubject: DragSubject;
  animStatus: AnimStatus;
  time: number;
}

export enum DragSubject {
  None = 'None',
  Bird = 'Bird',
}

export enum AnimStatus {
  Interactive = 'Interactive',
  Animating = 'Animating',
  Done = 'Done',
}

// The launch position (in terms of percentages of the canvas' width and
// height).
export const LAUNCH_POS = new Pos(-0.35, 0.2);

export const initState: State = {
  bounds: { width: 0, height: 0, left: 0, top: 0 },
  birdPos: LAUNCH_POS,
  dragSubject: DragSubject.None,
  animStatus: AnimStatus.Interactive,
  time: 0,
};

export const StateContext = React.createContext({
  state: null as any as State,
  dispatch: null as any as React.Dispatch<Action>,
});
