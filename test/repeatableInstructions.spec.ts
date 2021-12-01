import { LDAX, STATEEnums } from "../src/repeatableInstuctions";
import State8080 from "../src/state8080";

test("LDAX should throw error if using register that is not B or D", () => {
  const state = new State8080();
  expect(() => LDAX(state, STATEEnums.H)).toThrowError();
});
