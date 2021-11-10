import ConditionCodes from "../src/condition-codes";
import Ports from "../src/ports";
import State8080 from "../src/state8080";

describe("state8080", () => {
  let state: State8080;

  beforeAll(() => {
    state = new State8080();
  });

  test("a register", () => {
    expect(state.a).toBe(0);
    state.a = 255;
    expect(state.a).toBe(255);
    state.a = 257;
    expect(state.a).toBe(1);
  });

  test("b register", () => {
    expect(state.getB()).toBe(0);
    state.setB(255);
    expect(state.getB()).toBe(255);
    state.setB(257);
    expect(state.getB()).toBe(1);
  });

  test("c register", () => {
    expect(state.getC()).toBe(0);
    state.setC(255);
    expect(state.getC()).toBe(255);
    state.setC(257);
    expect(state.getC()).toBe(1);
  });

  test("d register", () => {
    expect(state.getD()).toBe(0);
    state.setD(255);
    expect(state.getD()).toBe(255);
    state.setD(257);
    expect(state.getD()).toBe(1);
  });

  test("e register", () => {
    expect(state.getE()).toBe(0);
    state.setE(255);
    expect(state.getE()).toBe(255);
    state.setE(257);
    expect(state.getE()).toBe(1);
  });

  test("h register", () => {
    expect(state.getH()).toBe(0);
    state.setH(255);
    expect(state.getH()).toBe(255);
    state.setH(257);
    expect(state.getH()).toBe(1);
  });

  test("l register", () => {
    expect(state.getL()).toBe(0);
    state.setL(255);
    expect(state.getL()).toBe(255);
    state.setL(257);
    expect(state.getL()).toBe(1);
  });

  test("enable interrupt", () => {
    expect(state.getEnableInterrupt()).toBe(false);
    state.setEnableInterrupt(true);
    expect(state.getEnableInterrupt()).toBe(true);
  });

  test("stack pointer", () => {
    expect(state.getSP()).toBe(0xf000);
    state.setSP(0xffff);
    expect(state.getSP()).toBe(0xffff);
    state.setSP(0xf0000);
    expect(state.getSP()).toBe(0);
  });

  test("program counter", () => {
    expect(state.getPC()).toBe(0);
    state.setPC(0xffff);
    expect(state.getPC()).toBe(0xffff);
    state.setPC(0xf0001);
    expect(state.getPC()).toBe(1);
  });

  test("memory", () => {
    expect(state.getMemory()).toHaveLength(0xffff);
    state.getMemory()[0] = 255;
    expect(state.getMemory()[0]).toBe(255);
    state.getMemory()[1] = 257;
    expect(state.getMemory()[1]).toBe(1);
  });

  test("condition codes", () => {
    expect(state.getCC()).toBeInstanceOf(ConditionCodes);
    expect(state.getCC().ac).toBe(false);
    state.getCC().ac = true;
    expect(state.getCC().ac).toBe(true);
  });

  test("ports", () => {
    expect(state.getPorts()).toBeInstanceOf(Ports);
    expect(state.getPorts().getR0()).toBe(0);
    state.getPorts().setR0(1);
    expect(state.getPorts().getR0()).toBe(1);
  });

  test("cycles", () => {
    expect(state.getCycles()).toBe(16667);
    state.setCycles(1);
    expect(state.getCycles()).toBe(1);
  });

  test("interrupt pointer", () => {
    expect(state.getInterruptPointer()).toBe(0x10);
    state.setInterruptPointer(0x10001);
    expect(state.getInterruptPointer()).toBe(1);
  });

  test("shift", () => {
    expect(state.getShift()).toBe(0);
    state.setShift(0x10001);
    expect(state.getShift()).toBe(1);
  });

  test("shift amount", () => {
    expect(state.getShiftAmount()).toBe(0);
    state.setShiftAmount(0x101);
    expect(state.getShiftAmount()).toBe(1);
  });
});
