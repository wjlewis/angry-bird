import { State, initState, DragSubject, AnimStatus, LAUNCH_POS } from './index';
import { Action, ActionType } from './actions';
import { Bounds } from '../hooks';
import { Pos } from '../tools';

export function reducer(state: State = initState, action: Action): State {
  switch (action.type) {
    case ActionType.UpdateBounds:
      return reduceUpdateBounds(state, action.payload);
    case ActionType.MouseDownBird:
      return reduceMouseDownBird(state);
    case ActionType.MouseMove:
      return reduceMouseMove(state, action.payload);
    case ActionType.MouseUp:
      return reduceMouseUp(state);
    case ActionType.Launch:
      return reduceLaunch(state);
    case ActionType.UpdateAnim:
      return reduceUpdateAnim(state, action.payload);
    case ActionType.CompleteAnim:
      return reduceCompleteAnim(state, action.payload);
    case ActionType.Reset:
      return reduceReset(state);
    default:
      return state;
  }
}

function reduceUpdateBounds(state: State, bounds: Bounds): State {
  return { ...state, bounds };
}

function reduceMouseDownBird(state: State): State {
  if (state.animStatus !== AnimStatus.Interactive) {
    return state;
  } else {
    return { ...state, dragSubject: DragSubject.Bird };
  }
}

function reduceMouseMove(state: State, pos: Pos): State {
  if (state.dragSubject === DragSubject.None) {
    return state;
  } else {
    return { ...state, birdPos: pos };
  }
}

function reduceMouseUp(state: State): State {
  return { ...state, dragSubject: DragSubject.None };
}

function reduceLaunch(state: State): State {
  return { ...state, animStatus: AnimStatus.Animating };
}

function reduceUpdateAnim(state: State, time: number): State {
  return { ...state, time };
}

function reduceCompleteAnim(state: State, time: number): State {
  return {
    ...state,
    time,
    animStatus: AnimStatus.Done,
  };
}

function reduceReset(state: State): State {
  return {
    ...state,
    birdPos: LAUNCH_POS,
    time: 0,
    animStatus: AnimStatus.Interactive,
  };
}
