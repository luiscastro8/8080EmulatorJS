export default class State8080 {
  private a: number;

  private b: number;

  private c: number;

  private d: number;

  private e: number;

  private h: number;

  private l: number;

  private enableInterrupt: boolean;

  private sp: number;

  constructor() {
    this.a = 0;
    this.b = 0;
    this.c = 0;
    this.d = 0;
    this.e = 0;
    this.h = 0;
    this.l = 0;
    this.enableInterrupt = false;
    this.sp = 0xf000;
  }

  public getA = () => this.a;

  public getB = () => this.b;

  public getC = () => this.c;

  public getD = () => this.d;

  public getE = () => this.e;

  public getH = () => this.h;

  public getL = () => this.l;

  public getEnableInterrupt = () => this.enableInterrupt;

  public getSP = () => this.sp;

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

  public setEnableInterrupt = (val: boolean) => {
    this.enableInterrupt = val;
  };

  public setSP = (val: number) => {
    this.sp = val & 0xffff;
  };
}
