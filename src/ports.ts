export default class Ports {
  private r0: number;

  private r1: number;

  private r2: number;

  private w3: number;

  private w5: number;

  private w6: number;

  public getR0 = () => this.r0;

  public getR1 = () => this.r1;

  public getR2 = () => this.r2;

  public getW3 = () => this.w3;

  public getW5 = () => this.w5;

  public getW6 = () => this.w6;

  public setR0 = (num: number) => {
    this.r0 = num & 0xff;
  };

  public setR1 = (num: number) => {
    this.r1 = num & 0xff;
  };

  public setR2 = (num: number) => {
    this.r2 = num & 0xff;
  };

  public setW3 = (num: number) => {
    this.w3 = num & 0xff;
  };

  public setW5 = (num: number) => {
    this.w5 = num & 0xff;
  };

  public setW6 = (num: number) => {
    this.w6 = num & 0xff;
  };
}
