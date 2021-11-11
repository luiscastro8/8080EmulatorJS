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
    expect(state.b).toBe(0);
    state.b = 255;
    expect(state.b).toBe(255);
    state.b = 257;
    expect(state.b).toBe(1);
  });

  test("c register", () => {
    expect(state.c).toBe(0);
    state.c = 255;
    expect(state.c).toBe(255);
    state.c = 257;
    expect(state.c).toBe(1);
  });

  test("d register", () => {
    expect(state.d).toBe(0);
    state.d = 255;
    expect(state.d).toBe(255);
    state.d = 257;
    expect(state.d).toBe(1);
  });

  test("e register", () => {
    expect(state.e).toBe(0);
    state.e = 255;
    expect(state.e).toBe(255);
    state.e = 257;
    expect(state.e).toBe(1);
  });

  test("h register", () => {
    expect(state.h).toBe(0);
    state.h = 255;
    expect(state.h).toBe(255);
    state.h = 257;
    expect(state.h).toBe(1);
  });

  test("l register", () => {
    expect(state.l).toBe(0);
    state.l = 255;
    expect(state.l).toBe(255);
    state.l = 257;
    expect(state.l).toBe(1);
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
