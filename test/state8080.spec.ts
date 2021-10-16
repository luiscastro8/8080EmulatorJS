import State8080 from "../src/state8080";

describe("state8080", () => {
  let state: State8080;

  beforeAll(() => {
    state = new State8080();
  });

  test("a register", () => {
    expect(state.getA()).toBe(0);
    state.setA(255);
    expect(state.getA()).toBe(255);
    state.setA(257);
    expect(state.getA()).toBe(1);
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
});
