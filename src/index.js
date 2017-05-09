// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {ShannonFanoCode} from './services/ShannonFanoCode';

const Item = ({id, onChange, freq, probability, codeLength, code}) => (
  <tr>
    <th scope="row">{id}</th>
    <td>
      <input
        type="number"
        className="form-control"
        value={freq}
        onChange={e => onChange(id, e.target.value)}
      />
    </td>
    <td>{probability.toPrecision(3)}</td>
    <td>{codeLength.toPrecision(3)}</td>
    <td>{code}</td>
  </tr>
);

class App extends React.Component {
  state: {
    frequencies: Array<number>,
  };

  constructor() {
    super();
    const frequencies = [600, 300, 50, 25, 25];
    this.state = {
      frequencies,
    };
  }

  buildItems(frequencies: Array<number>) {
    const sfc = new ShannonFanoCode(frequencies);
    const codeLen = sfc.codeLength();
    const codes = sfc.buildPrefixCode();
    const items = [];
    const total = frequencies.reduce((x, y) => x + y, 0);
    for (let i = 0; i < frequencies.length; i++) {
      items.push({
        id: i + 1,
        freq: frequencies[i],
        probability: frequencies[i] / total,
        codeLength: codeLen[i],
        code: codes[i],
      });
    }
    return items;
  }

  render() {
    const items = this.buildItems(this.state.frequencies);
    // http://bootsnipp.com/snippets/featured/dynamic-table-row-creation-and-deletion
    return (
      <div className="container">
        <h1>Shannon-Fano Code</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Frequency</th>
              <th>Empirical Probability</th>
              <th>Code Length</th>
              <th>Code</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <Item
                key={item.id}
                id={item.id}
                onChange={this.onChange}
                freq={item.freq}
                probability={item.probability}
                codeLength={item.codeLength}
                code={item.code}
              />
            ))}
          </tbody>
        </table>
        <button
          type="button"
          className="btn btn-default pull-left"
          onClick={this.addDatum}
        >
          Add Row
        </button>
        <button
          type="button"
          className="btn btn-default pull-right"
          onClick={this.removeDatum}
        >
          Delete Row
        </button>
      </div>
    );
  }

  // http://stackoverflow.com/questions/10834796/validate-that-a-string-is-a-positive-integer
  isNormalInteger(str: string) {
    var n = Math.floor(Number(str));
    return String(n) === str && n >= 0;
  }

  onChange = (id: number, value: string) => {
    if (!this.isNormalInteger(value)) {
      return;
    }
    const frequencies = [...this.state.frequencies];
    frequencies[id - 1] = Number.parseInt(value, 10);
    this.setState({
      frequencies,
    });
  };

  addDatum = () => {
    this.setState({
      frequencies: this.state.frequencies.concat(0),
    });
  };

  removeDatum = () => {
    const freq = this.state.frequencies;
    if (freq.length === 0) {
      return;
    }
    this.setState({
      frequencies: freq.slice(0, -1),
    });
  };
}

ReactDOM.render(<App />, document.getElementById('react-root'));
