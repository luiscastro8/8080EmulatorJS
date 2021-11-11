export default class Ports {
  private privateR0: number = 0; // 8 bit

  private privateR1: number = 0; // 8 bit

  private privateR2: number = 0; // 8 bit

  private privateW3: number = 0; // 8 bit

  private privateW5: number = 0; // 8 bit

  private privateW6: number = 0; // 8 bit

  public get r0() {
    return this.privateR0;
  }

  public set r0(val: number) {
    this.privateR0 = val & 0xff;
  }

  public get r1() {
    return this.privateR1;
  }

  public set r1(val: number) {
    this.privateR1 = val & 0xff;
  }

  public get r2() {
    return this.privateR2;
  }

  public set r2(val: number) {
    this.privateR2 = val & 0xff;
  }

  public get w3() {
    return this.privateW3;
  }

  public set w3(val: number) {
    this.privateW3 = val & 0xff;
  }

  public get w5() {
    return this.privateW5;
  }

  public set w5(val: number) {
    this.privateW5 = val & 0xff;
  }

  public get w6() {
    return this.privateW6;
  }

  public set w6(val: number) {
    this.privateW6 = val & 0xff;
  }
}
