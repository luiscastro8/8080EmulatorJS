import ConditionCodes from "../src/conditionCodes";

test("zero flag", () => {
  const cc = new ConditionCodes();
  cc.setFlags(0, false);
  expect(cc.z).toBe(true);
  cc.setFlags(2, false);
  expect(cc.z).toBe(false);
});

test("sign flag", () => {
  const cc = new ConditionCodes();
  cc.setFlags(0b10000000, false);
  expect(cc.s).toBe(true);
  cc.setFlags(0b01111111, false);
  expect(cc.s).toBe(false);
});

test("parity flag", () => {
  const cc = new ConditionCodes();
  cc.setFlags(0, false);
  expect(cc.p).toBe(true);
  cc.setFlags(1, false);
  expect(cc.p).toBe(false);
});

test("carry flag", () => {
  const cc = new ConditionCodes();
  cc.setFlags(0xfff, false);
  expect(cc.cy).toBe(false);
  cc.setFlags(0xfff, true);
  expect(cc.cy).toBe(true);
  cc.setFlags(0xf, true);
  expect(cc.cy).toBe(false);
});

// TODO Remove this if it turned out wrong

// test("getParity", () => {
//   expect(ConditionCodes.getParity(0b000)).toBe(0);
//   expect(ConditionCodes.getParity(0b001)).toBe(1);
//   expect(ConditionCodes.getParity(0b010)).toBe(1);
//   expect(ConditionCodes.getParity(0b011)).toBe(2);
//   expect(ConditionCodes.getParity(0b100)).toBe(1);
// });
