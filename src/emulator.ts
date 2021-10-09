export default class State8080 {
    private eightBitRegisters: Uint8Array

    constructor() {
      this.eightBitRegisters = new Uint8Array(7);
    }

    public getA = () => this.eightBitRegisters[0];

    public getB = () => this.eightBitRegisters[1];

    public getC = () => this.eightBitRegisters[2];

    public getD = () => this.eightBitRegisters[3];

    public getE = () => this.eightBitRegisters[4];

    public getH = () => this.eightBitRegisters[5];

    public getL = () => this.eightBitRegisters[6];

    public setA = (num: number) => { this.eightBitRegisters[0] = num; };

    public setB = (num: number) => { this.eightBitRegisters[1] = num; };

    public setC = (num: number) => { this.eightBitRegisters[2] = num; };

    public setD = (num: number) => { this.eightBitRegisters[3] = num; };

    public setE = (num: number) => { this.eightBitRegisters[4] = num; };

    public setH = (num: number) => { this.eightBitRegisters[5] = num; };

    public setL = (num: number) => { this.eightBitRegisters[6] = num; };
}
