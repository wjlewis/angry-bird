import { State, DragSubject, AnimStatus, LAUNCH_POS } from './index';
import { Pos, slingShotTrajectory, SlingShotTrajectory } from '../tools';

export function launchPos(state: State): Pos {
  const { width, height } = state.bounds;
  return LAUNCH_POS.fromPc(width, height);
}

export function birdPos(state: State): Pos {
  const { width, height } = state.bounds;
  if (state.animStatus === AnimStatus.Interactive) {
    return state.birdPos.fromPc(width, height);
  } else {
    const { animFn } = trajectory(state);
    return animFn(state.time).birdPos;
  }
}

export function sling(state: State): Pos | undefined {
  const { width, height } = state.bounds;
  if (state.animStatus === AnimStatus.Interactive) {
    return state.birdPos.fromPc(width, height);
  } else {
    const { animFn } = trajectory(state);
    const { showSling, birdPos } = animFn(state.time);
    return showSling ? birdPos : undefined;
  }
}

export function canReset(state: State): boolean {
  return state.animStatus === AnimStatus.Done;
}

export function canInteract(state: State): boolean {
  return state.animStatus === AnimStatus.Interactive;
}

export function readyToLaunch(state: State): boolean {
  return state.dragSubject === DragSubject.Bird;
}

export function trajectoryPath(state: State): string {
  const { root1, root2, control } = trajectory(state);
  return `M ${root1.x} ${root1.y}
          Q ${control.x} ${control.y},
            ${root2.x} ${root2.y}`;
}

export function animDuration(state: State): number {
  return trajectory(state).animDuration;
}

export function animFn(state: State) {
  return trajectory(state).animFn;
}

// A memoized function computing the bird's trajectory information from the
// current state. This is a small wrapper over `slingShotTrajectory` that
// caches the most recent return value and converts from percentages to SVG
// units.
const trajectory = (() => {
  let cachedArgs = {
    birdPos: undefined as any,
    bounds: undefined as any,
  };
  let cachedAnswer: SlingShotTrajectory;

  return (state: State) => {
    if (
      cachedAnswer &&
      state.birdPos === cachedArgs.birdPos &&
      state.bounds === cachedArgs.bounds
    ) {
      return cachedAnswer;
    }

    cachedArgs = { birdPos: state.birdPos, bounds: state.bounds };

    const { width, height } = state.bounds;
    cachedAnswer = slingShotTrajectory(
      state.birdPos.fromPc(width, height),
      launchPos(state)
    );
    return cachedAnswer;
  };
})();
