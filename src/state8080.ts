import ConditionCodes from "./condition-codes";
import Ports from "./ports";

export default class State8080 {
  private privateA: number = 0; // 8 bit

  private b: number; // 8 bit

  private c: number; // 8 bit

  private d: number; // 8 bit

  private e: number; // 8 bit

  private h: number; // 8 bit

  private l: number; // 8 bit

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
    this.b = 0;
    this.c = 0;
    this.d = 0;
    this.e = 0;
    this.h = 0;
    this.l = 0;
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

  public getB = () => this.b;

  public getC = () => this.c;

  public getD = () => this.d;

  public getE = () => this.e;

  public getH = () => this.h;

  public getL = () => this.l;

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
