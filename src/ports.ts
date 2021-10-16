export default class Ports {
  private r0: number = 0;

  private r1: number = 0;

  private r2: number = 0;

  private w3: number = 0;

  private w5: number = 0;

  private w6: number = 0;

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
