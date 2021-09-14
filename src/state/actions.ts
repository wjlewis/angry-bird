import { Pos } from '../tools';
import { Bounds } from '../hooks';

export interface Action {
  type: string;
  payload?: any;
}

export enum ActionType {
  UpdateBounds = 'UpdateBounds',
  MouseDownBird = 'MouseDownBird',
  MouseMove = 'MouseMove',
  MouseUp = 'MouseUp',
  UpdateAnim = 'UpdateAnim',
  Launch = 'Launch',
  CompleteAnim = 'CompleteAnim',
  Reset = 'Reset',
}

export function updateBounds(bounds: Bounds): Action {
  return { type: ActionType.UpdateBounds, payload: bounds };
}

export function mouseDownBird(): Action {
  return { type: ActionType.MouseDownBird };
}

export function mouseMove(pos: Pos): Action {
  return { type: ActionType.MouseMove, payload: pos };
}

export function mouseUp(): Action {
  return { type: ActionType.MouseUp };
}

export function launch(): Action {
  return { type: ActionType.Launch };
}

export function updateAnim(time: number): Action {
  return { type: ActionType.UpdateAnim, payload: time };
}

export function completeAnim(time: number): Action {
  return { type: ActionType.CompleteAnim, payload: time };
}

export function reset(): Action {
  return { type: ActionType.Reset };
}
