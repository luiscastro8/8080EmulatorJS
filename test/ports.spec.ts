import Ports from "../src/ports";

test("8 bit registers should be 8 bit", () => {
  const ports = new Ports();

  ports.setR0(255);
  expect(ports.getR0()).toBe(255);
  ports.setR0(256);
  expect(ports.getR0()).toBe(0);

  ports.setR1(255);
  expect(ports.getR1()).toBe(255);
  ports.setR1(256);
  expect(ports.getR1()).toBe(0);

  ports.setR2(255);
  expect(ports.getR2()).toBe(255);
  ports.setR2(256);
  expect(ports.getR2()).toBe(0);

  ports.setW3(255);
  expect(ports.getW3()).toBe(255);
  ports.setW3(256);
  expect(ports.getW3()).toBe(0);

  ports.setW5(255);
  expect(ports.getW5()).toBe(255);
  ports.setW5(256);
  expect(ports.getW5()).toBe(0);

  ports.setW6(255);
  expect(ports.getW6()).toBe(255);
  ports.setW6(256);
  expect(ports.getW6()).toBe(0);
});
