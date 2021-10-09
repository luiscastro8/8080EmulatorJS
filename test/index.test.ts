import State8080 from "../src/emulator";

test('8 bit registers are correctly mapped', () => {
    const state = new State8080();

    state.setA(1);
    state.setB(2);
    state.setC(3);
    state.setD(4);
    state.setE(5);
    state.setH(6);
    state.setL(7);

    expect(state.getA()).toBe(1);
    expect(state.getB()).toBe(2);
    expect(state.getC()).toBe(3);
    expect(state.getD()).toBe(4);
    expect(state.getE()).toBe(5);
    expect(state.getH()).toBe(6);
    expect(state.getL()).toBe(7);
})