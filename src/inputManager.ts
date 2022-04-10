export default class InputManager {
  p1Right: boolean;

  p1Left: boolean;

  p1Fire: boolean;

  p1Start: boolean;

  credit: boolean;

  getR1(): number {
    let result = 0;

    if (this.credit) {
      result |= 0b00000001;
    }
    if (this.p1Right) {
      result |= 0b01000000;
    }
    if (this.p1Start) {
      result |= 0b00000100;
    }
    if (this.p1Fire) {
      result |= 0b00010000;
    }
    if (this.p1Left) {
      result |= 0b00100000;
    }

    return result;
  }
}
