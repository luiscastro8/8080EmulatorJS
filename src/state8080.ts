export default class State8080 {
  private a: number;

  private b: number;

  private c: number;

  private d: number;

  private e: number;

  private h: number;

  private l: number;

  public getA = () => this.a;

  public getB = () => this.b;

  public getC = () => this.c;

  public getD = () => this.d;

  public getE = () => this.e;

  public getH = () => this.h;

  public getL = () => this.l;

  public setA = (num: number) => {
    this.a = num & 0xff;
  };

  public setB = (num: number) => {
    this.b = num & 0xff;
  };

  public setC = (num: number) => {
    this.c = num & 0xff;
  };

  public setD = (num: number) => {
    this.d = num & 0xff;
  };

  public setE = (num: number) => {
    this.e = num & 0xff;
  };

  public setH = (num: number) => {
    this.h = num & 0xff;
  };

  public setL = (num: number) => {
    this.l = num & 0xff;
  };
}
