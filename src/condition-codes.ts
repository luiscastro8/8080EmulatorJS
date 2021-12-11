export default class ConditionCodes {
  public z: boolean = false;

  public s: boolean = false;

  public p: boolean = false;

  public cy: boolean = false;

  public ac: boolean = false;
  // TODO see if pad is needed

  public setFlags = (answer: number, changeCarry: boolean) => {
    this.z = (answer & 0xff) === 0;
    this.s = (answer & 0x80) !== 0;
    this.p = ConditionCodes.getParity(answer & 0xff) % 2 === 0;
    if (changeCarry) {
      this.cy = answer > 0xff || answer < 0;
    }
  };

  public static getParity = (val: number) => {
    let count = 0;
    let tempVal = val;
    while (tempVal !== 0) {
      if (tempVal % 2 === 1) {
        count += 1;
      }
      tempVal = Math.floor(tempVal / 2);
    }
    return count;
  };
}
