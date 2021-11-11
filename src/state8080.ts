import ConditionCodes from "./condition-codes";
import Ports from "./ports";

export default class State8080 {
  private privateA: number = 0; // 8 bit

  private privateB: number = 0; // 8 bit

  private privateC: number = 0; // 8 bit

  private privateD: number = 0; // 8 bit

  private privateE: number = 0; // 8 bit

  private privateH: number = 0; // 8 bit

  private privateL: number = 0; // 8 bit

  private enableInterrupt: boolean;

  private sp: number; // 16 bit

  private pc: number; // 16 bit

  private memory: Uint8Array;

  private cc: ConditionCodes;

  private ports: Ports;

  private cycles: number;

  private interruptPointer: number; // 16 bit

  private shift: number; // 16 bit

  private shiftAmount: number; // 8 bit

  constructor() {
    this.enableInterrupt = false;
    this.sp = 0xf000;
    this.pc = 0;
    this.memory = new Uint8Array(0xffff);
    this.cc = new ConditionCodes();
    this.ports = new Ports();
    this.cycles = 16667;
    this.interruptPointer = 0x10;
    this.shift = 0;
    this.shiftAmount = 0;
  }

  public get a() {
    return this.privateA;
  }

  public get b() {
    return this.privateB;
  }

  public get c() {
    return this.privateC;
  }

  public get d() {
    return this.privateD;
  }

  public get e() {
    return this.privateE;
  }

  public get h() {
    return this.privateH;
  }

  public get l() {
    return this.privateL;
  }

  public getEnableInterrupt = () => this.enableInterrupt;

  public getSP = () => this.sp;

  public getPC = () => this.pc;

  public getMemory = () => this.memory;

  public getCC = () => this.cc;

  public getPorts = () => this.ports;

  public getCycles = () => this.cycles;

  public getInterruptPointer = () => this.interruptPointer;

  public getShift = () => this.shift;

  public getShiftAmount = () => this.shiftAmount;

  public set a(val: number) {
    this.privateA = val & 0xff;
  }

  public set b(val: number) {
    this.privateB = val & 0xff;
  }

  public set c(val: number) {
    this.privateC = val & 0xff;
  }

  public set d(val: number) {
    this.privateD = val & 0xff;
  }

  public set e(val: number) {
    this.privateE = val & 0xff;
  }

  public set h(val: number) {
    this.privateH = val & 0xff;
  }

  public set l(val: number) {
    this.privateL = val & 0xff;
  }

  public setEnableInterrupt = (val: boolean) => {
    this.enableInterrupt = val;
  };

  public setSP = (val: number) => {
    this.sp = val & 0xffff;
  };

  public setPC = (val: number) => {
    this.pc = val & 0xffff;
  };

  public setCycles = (val: number) => {
    this.cycles = val;
  };

  public setInterruptPointer = (val: number) => {
    this.interruptPointer = val & 0xffff;
  };

  public setShift = (val: number) => {
    this.shift = val & 0xffff;
  };

  public setShiftAmount = (val: number) => {
    this.shiftAmount = val & 0xff;
  };
}
