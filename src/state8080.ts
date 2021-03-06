import ConditionCodes from "./conditionCodes";
import Ports from "./ports";

export default class State8080 {
  private privateA: number = 0; // 8 bit

  private privateB: number = 0; // 8 bit

  private privateC: number = 0; // 8 bit

  private privateD: number = 0; // 8 bit

  private privateE: number = 0; // 8 bit

  private privateH: number = 0; // 8 bit

  private privateL: number = 0; // 8 bit

  private privateEnableInterrupt: boolean = false;

  private privateSP: number = 0xf000; // 16 bit

  private privatePC: number = 0; // 16 bit

  private privateMemory: Uint8Array = new Uint8Array(0xffff);

  private privateCC: ConditionCodes = new ConditionCodes();

  private privatePorts: Ports = new Ports();

  private privateCycles: number = 16667;

  private privateInterruptPointer: number = 0x10; // 16 bit

  private privateShift: number = 0; // 16 bit

  private privateShiftAmount: number = 0; // 8 bit

  public get a() {
    return this.privateA;
  }

  public set a(val: number) {
    this.privateA = val & 0xff;
  }

  public get b() {
    return this.privateB;
  }

  public set b(val: number) {
    this.privateB = val & 0xff;
  }

  public get c() {
    return this.privateC;
  }

  public set c(val: number) {
    this.privateC = val & 0xff;
  }

  public get d() {
    return this.privateD;
  }

  public set d(val: number) {
    this.privateD = val & 0xff;
  }

  public get e() {
    return this.privateE;
  }

  public set e(val: number) {
    this.privateE = val & 0xff;
  }

  public get h() {
    return this.privateH;
  }

  public set h(val: number) {
    this.privateH = val & 0xff;
  }

  public get l() {
    return this.privateL;
  }

  public set l(val: number) {
    this.privateL = val & 0xff;
  }

  public get enableInterrupt() {
    return this.privateEnableInterrupt;
  }

  public set enableInterrupt(val: boolean) {
    this.privateEnableInterrupt = val;
  }

  public get sp() {
    return this.privateSP;
  }

  public set sp(val: number) {
    this.privateSP = val & 0xffff;
  }

  public get pc() {
    return this.privatePC;
  }

  public set pc(val: number) {
    this.privatePC = val & 0xffff;
  }

  public get memory() {
    return this.privateMemory;
  }

  public get cc() {
    return this.privateCC;
  }

  public get ports() {
    return this.privatePorts;
  }

  public get cycles() {
    return this.privateCycles;
  }

  public set cycles(val: number) {
    this.privateCycles = val;
  }

  public get interruptPointer() {
    return this.privateInterruptPointer;
  }

  public set interruptPointer(val: number) {
    this.privateInterruptPointer = val & 0xffff;
  }

  public get shift() {
    return this.privateShift;
  }

  public set shift(val: number) {
    this.privateShift = val & 0xffff;
  }

  public get shiftAmount() {
    return this.privateShiftAmount;
  }

  public set shiftAmount(val: number) {
    this.privateShiftAmount = val & 0xff;
  }

  public writeToPort = (port: number) => {
    /* eslint-disable-next-line default-case */
    switch (port) {
      case 2: {
        this.shiftAmount = this.a & 0b111;
        break;
      }
      case 3: {
        this.ports.w3 = this.a;
        break;
      }
      case 4: {
        this.shift >>= 8;
        this.shift |= this.a << 8;
        break;
      }
      case 5: {
        this.ports.w5 = this.a;
        break;
      }
      case 6: {
        this.ports.w6 = this.a;
        break;
      }
    }
  };

  public readFromPort = (port: number) => {
    switch (port) {
      case 0: {
        this.a = this.ports.r0;
        break;
      }
      case 1: {
        this.a = this.ports.r1;
        this.ports.r1 = 0;
        break;
      }
      case 2: {
        this.a = this.ports.r2;
        break;
      }
      case 3: {
        let temp = this.shift << this.shiftAmount;
        temp >>= 8;
        this.a = temp;
        break;
      }
      default: {
        throw new Error("An error has occurred");
      }
    }
  };
}
