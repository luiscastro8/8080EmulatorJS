import Ports from "../src/ports";

test("8 bit registers should be 8 bit", () => {
  const ports = new Ports();

  ports.r0 = 255;
  expect(ports.r0).toBe(255);
  ports.r0 = 256;
  expect(ports.r0).toBe(0);

  ports.r1 = 255;
  expect(ports.r1).toBe(255);
  ports.r1 = 256;
  expect(ports.r1).toBe(0);

  ports.r2 = 255;
  expect(ports.r2).toBe(255);
  ports.r2 = 256;
  expect(ports.r2).toBe(0);

  ports.w3 = 255;
  expect(ports.w3).toBe(255);
  ports.w3 = 256;
  expect(ports.w3).toBe(0);

  ports.w5 = 255;
  expect(ports.w5).toBe(255);
  ports.w5 = 256;
  expect(ports.w5).toBe(0);

  ports.w6 = 255;
  expect(ports.w6).toBe(255);
  ports.w6 = 256;
  expect(ports.w6).toBe(0);
});
