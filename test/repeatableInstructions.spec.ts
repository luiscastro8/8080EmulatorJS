import { CALL, LDAX, STATEEnums } from "../src/repeatableInstuctions";
import State8080 from "../src/state8080";

test("CALL", () => {
  const state = new State8080();
  const { sp } = state;
  state.pc = 0x1011;

  CALL(state, 0x2021);

  expect(state.pc).toBe(0x2021);
  expect(state.sp).toBe(sp - 2);
  expect(state.memory[state.sp]).toBe(0x14);
  expect(state.memory[state.sp + 1]).toBe(0x10);
});

test("LDAX should throw error if using register that is not B or D", () => {
  const state = new State8080();
  expect(() => LDAX(state, STATEEnums.H)).toThrowError();
});
