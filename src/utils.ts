/* Takes two 8-bit numbers and combines them into one 16-bit number */
export const HILO = (hi: number, lo: number): number => (hi << 8) | lo;
export default HILO;
