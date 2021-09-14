import { Pos } from './Pos';

export const G_ACCEL = 1000;
export const PROJECTILE_MASS = 1;
export const SPRING_K = 30;

// Compute information about the trajectory of a sling-shot whose mass is
// stretched on a classical spring stretched to `pos0` from `fixedPos`. For
// the sake of simplicity, we assume that the mass is entirely under the
// influence of the spring/elastic until it reaches the position `fixedPos`;
// at this point, its trajectory is entirely ballistic.
export function slingShotTrajectory(
  pos0: Pos,
  fixedPos: Pos
): SlingShotTrajectory {
  const diff = fixedPos.minus(pos0);
  const angle = Math.atan2(diff.y, diff.x);

  // SIMPLIFICATION assume all of the potential energy from the spring
  // contributes to the mass's initial velocity.
  const v0 = Math.sqrt(SPRING_K / PROJECTILE_MASS) * diff.magnitude();

  const v0X = v0 * Math.cos(angle);
  const v0Y = v0 * Math.sin(angle);

  // The square-root of the descriminant, used to compute the roots of the
  // parabolic trajectory.
  const descrim = Math.sqrt(v0Y ** 2 + 2 * G_ACCEL * fixedPos.y);

  // The times at which the roots and apex are achieved, assuming t=0 when
  // the mass's position is equal to `fixedPos`.
  const root1T = (v0Y - descrim) / G_ACCEL;
  const root2T = (v0Y + descrim) / G_ACCEL;
  const apexT = v0Y / G_ACCEL;

  const root1X = v0X * root1T + fixedPos.x;
  const root2X = v0X * root2T + fixedPos.x;

  const apexX = (root1X + root2X) / 2;
  const apexY = -0.5 * G_ACCEL * apexT ** 2 + v0Y * apexT + fixedPos.y;

  // Computing the control point from the apex uses a nice feature of
  // quadratic bezier curves.
  // TODO explain this feature.
  const controlY = apexY * 2;

  const root1 = new Pos(root1X, 0);
  const root2 = new Pos(root2X, 0);
  const control = new Pos(apexX, controlY);

  // Animation calculations
  // The amount of time the mass spends entirely under the influence of the
  // spring/elastic.
  const springT = (Math.PI / 2) * Math.sqrt(PROJECTILE_MASS / SPRING_K);

  const animFn = (t: number) => {
    if (t <= springT) {
      const progress = 1 - Math.cos(Math.sqrt(SPRING_K / PROJECTILE_MASS) * t);
      return { showSling: true, birdPos: pos0.plus(diff.scale(progress)) };
    } else {
      const tNorm = t - springT;
      const x = v0X * tNorm + fixedPos.x;
      const y = -0.5 * G_ACCEL * tNorm ** 2 + v0Y * tNorm + fixedPos.y;
      // We hide the sling once the bird is in flight.
      return { showSling: false, birdPos: new Pos(x, y) };
    }
  };

  const animDuration = springT + root2T;

  return { root1, root2, control, animFn, animDuration };
}

export interface SlingShotTrajectory {
  root1: Pos;
  root2: Pos;
  control: Pos;
  animDuration: number;
  animFn: (t: number) => SlingShotAnimState;
}

export interface SlingShotAnimState {
  birdPos: Pos;
  showSling: boolean;
}
