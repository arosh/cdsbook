export class ShannonFanoCode {
  constructor(frequences) {
    this.frequences = frequences;
    this.count = 0;
    for (const freq of frequences) {
      this.count += freq;
    }
  }
  codeLength() {
    const ls = [];
    for (const freq of this.frequences) {
      if (freq === 0) {
        ls.push(0);
        return 0;
      } else {
        ls.push(Math.log2(this.count / freq));
      }
    }
    return ls;
  }
  buildPrefixCode() {
    const codeLen = this.codeLength();
    const S = [];
    for (let i = 0; i < this.frequences.length; i++) {
      S.push({ s: i, l: Math.ceil(codeLen[i]) | 0 });
    }
    S.sort((x, y) => x.l - y.l);
    const codes = [];
    codes[0] = this.binaryCode(0, S[0].l);
    for (let i = 1; i < S.length; i++) {
      codes[i] = (codes[i - 1] + 1) << (S[i].l - S[i - 1].l);
    }
    const retval = [];
    for (let i = 0; i < S.length; i++) {
      retval[S[i].s] = this.binaryCode(codes[i], S[i].l);
    }
    return retval;
  }
  binaryCode(value, length) {
    let s = value.toString(2);
    while (s.length < length) {
      s = "0" + s;
    }
    return s;
  }
}
