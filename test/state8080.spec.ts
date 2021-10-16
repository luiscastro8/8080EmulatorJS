import State8080 from "../src/state8080";

describe('state8080', () => {
  let state: State8080;

  beforeEach(() => {
    state = new State8080();
  })

  test("8 bit registers shoulb be 8 bit", () => {  
    state.setB(255);
    expect(state.getB()).toBe(255);
    state.setB(256);
    expect(state.getB()).toBe(0);
  
    state.setC(255);
    expect(state.getC()).toBe(255);
    state.setC(256);
    expect(state.getC()).toBe(0);
  
    state.setD(255);
    expect(state.getD()).toBe(255);
    state.setD(256);
    expect(state.getD()).toBe(0);
  
    state.setE(255);
    expect(state.getE()).toBe(255);
    state.setE(256);
    expect(state.getE()).toBe(0);
  
    state.setH(255);
    expect(state.getH()).toBe(255);
    state.setH(256);
    expect(state.getH()).toBe(0);
  
    state.setL(255);
    expect(state.getL()).toBe(255);
    state.setL(256);
    expect(state.getL()).toBe(0);
  });

  test('a register', () => {
    expect(state.getA()).toBe(0);
    state.setA(255);
    expect(state.getA()).toBe(255);
    state.setA(256);
    expect(state.getA()).toBe(0);
  })

  test('enable interrupt', () => {
    expect(state.getEnableInterrupt()).toBe(false);
    state.setEnableInterrupt(true);
    expect(state.getEnableInterrupt()).toBe(true);
  })
  
  test('stack pointer', () => {
    expect(state.getSP()).toBe(0xf000);
    state.setSP(69);
    expect(state.getSP()).toBe(69);
  })
});