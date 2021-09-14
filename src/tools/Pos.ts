export class Pos {
  constructor(public x: number, public y: number) {}

  plus(rhs: Pos): Pos {
    return new Pos(this.x + rhs.x, this.y + rhs.y);
  }

  minus(rhs: Pos): Pos {
    return new Pos(this.x - rhs.x, this.y - rhs.y);
  }

  scale(f: number): Pos {
    return new Pos(f * this.x, f * this.y);
  }

  magnitude(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  toPc(width: number, height: number): Pos {
    return new Pos(this.x / width, this.y / height);
  }

  fromPc(width: number, height: number): Pos {
    return new Pos(this.x * width, this.y * height);
  }
}
