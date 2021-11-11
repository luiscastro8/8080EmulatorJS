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
    expect(state.enableInterrupt).toBe(false);
    state.enableInterrupt = true;
    expect(state.enableInterrupt).toBe(true);
  });

  test("stack pointer", () => {
    expect(state.sp).toBe(0xf000);
    state.sp = 0xffff;
    expect(state.sp).toBe(0xffff);
    state.sp = 0xf0000;
    expect(state.sp).toBe(0);
  });

  test("program counter", () => {
    expect(state.pc).toBe(0);
    state.pc = 0xffff;
    expect(state.pc).toBe(0xffff);
    state.pc = 0xf0001;
    expect(state.pc).toBe(1);
  });

  test("memory", () => {
    expect(state.memory).toHaveLength(0xffff);
    state.memory[0] = 255;
    expect(state.memory[0]).toBe(255);
    state.memory[1] = 257;
    expect(state.memory[1]).toBe(1);
  });

  test("condition codes", () => {
    expect(state.cc).toBeInstanceOf(ConditionCodes);
    expect(state.cc.ac).toBe(false);
    state.cc.ac = true;
    expect(state.cc.ac).toBe(true);
  });

  test("ports", () => {
    expect(state.ports).toBeInstanceOf(Ports);
    expect(state.ports.getR0()).toBe(0);
    state.ports.setR0(1);
    expect(state.ports.getR0()).toBe(1);
  });

  test("cycles", () => {
    expect(state.cycles).toBe(16667);
    state.cycles = 1;
    expect(state.cycles).toBe(1);
  });

  test("interrupt pointer", () => {
    expect(state.interruptPointer).toBe(0x10);
    state.interruptPointer = 0x10001;
    expect(state.interruptPointer).toBe(1);
  });

  test("shift", () => {
    expect(state.shift).toBe(0);
    state.shift = 0x10001;
    expect(state.shift).toBe(1);
  });

  test("shift amount", () => {
    expect(state.shiftAmount).toBe(0);
    state.shiftAmount = 0x101;
    expect(state.shiftAmount).toBe(1);
  });
});
