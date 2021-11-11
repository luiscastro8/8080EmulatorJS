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

  public get enableInterrupt() {
    return this.privateEnableInterrupt;
  }

  public get sp() {
    return this.privateSP;
  }

  public get pc() {
    return this.privatePC;
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

  public get interruptPointer() {
    return this.privateInterruptPointer;
  }

  public get shift() {
    return this.privateShift;
  }

  public get shiftAmount() {
    return this.privateShiftAmount;
  }

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

  public set enableInterrupt(val: boolean) {
    this.privateEnableInterrupt = val;
  }

  public set sp(val: number) {
    this.privateSP = val & 0xffff;
  }

  public set pc(val: number) {
    this.privatePC = val & 0xffff;
  }

  public set cycles(val: number) {
    this.privateCycles = val;
  }

  public set interruptPointer(val: number) {
    this.privateInterruptPointer = val & 0xffff;
  }

  public set shift(val: number) {
    this.privateShift = val & 0xffff;
  }

  public set shiftAmount(val: number) {
    this.privateShiftAmount = val & 0xff;
  }
}
