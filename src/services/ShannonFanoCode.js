// @flow

export class ShannonFanoCode {
  frequencies: Array<number>;
  total: number;
  constructor(frequencies: Array<number>) {
    this.frequencies = frequencies;
    this.total = frequencies.reduce((x, y) => x + y, 0);
  }
  codeLength() {
    const ls = [];
    for (const freq of this.frequencies) {
      if (freq === 0) {
        ls.push(0);
      } else {
        ls.push(Math.log2(this.total / freq));
      }
    }
    return ls;
  }
  buildPrefixCode() {
    const codeLen = this.codeLength();
    const S = [];
    for (let i = 0; i < this.frequencies.length; i++) {
      S.push({s: i, l: Math.ceil(codeLen[i]) | 0});
    }
    S.sort((x, y) => x.l - y.l);
    const codes = [];
    codes[0] = 0;
    for (let i = 1; i < S.length; i++) {
      codes[i] = (codes[i - 1] + 1) << (S[i].l - S[i - 1].l);
    }
    const retval = [];
    for (let i = 0; i < S.length; i++) {
      retval[S[i].s] = this.binaryCode(codes[i], S[i].l);
    }
    return retval;
  }
  binaryCode(value: number, length: number) {
    let s = value.toString(2);
    return s.padStart(length, '0');
  }
}
