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
        ls.push(Math.ceil(Math.log2(this.count / freq)) | 0);
      }
    }
    return ls;
  }
  buildPrefixCode() {
    const codeLen = this.codeLength();
    const S = [];
    for (let i = 0; i < this.frequences.length; i++) {
      S.push({ s: i, l: codeLen[i] });
    }
    S.sort((x, y) => x.l - y.l);
    const codes = [];
    codes[0] = 0;
    for (let i = 1; i < S.length; i++) {
      codes[i] = (codes[i - 1] + 1) << (S[i].l - S[i - 1].l);
    }
    const retval = [];
    for (let i = 0; i < S.length; i++) {
      retval[S[i].s] = codes[i].toString(2);
    }
    return retval;
  }
}
