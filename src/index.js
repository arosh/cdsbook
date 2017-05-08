import React from 'react';
import ReactDOM from 'react-dom';
import {ShannonFanoCode} from './services/ShannonFanoCode';

const Item = ({id, onChange, freq, codeLength, code}) => (
  <tr>
    <th scope="row">{id}</th>
    <td>
      <input
        type="text"
        className="form-control"
        value={freq}
        onChange={e => onChange(id, e.target.value)}
      />
    </td>
    <td>{codeLength}</td>
    <td>{code}</td>
  </tr>
);

class App extends React.Component {
  constructor() {
    super();
    const frequencies = [600, 300, 50, 25, 25];
    // const frequencies = [1, 1, 1];
    this.state = {
      frequencies,
    };
  }

  buildItems(frequencies) {
    const sfc = new ShannonFanoCode(frequencies);
    const codeLen = sfc.codeLength();
    const codes = sfc.buildPrefixCode();
    const items = [];
    for (let i = 0; i < frequencies.length; i++) {
      items.push({
        id: i + 1,
        initialFreq: frequencies[i],
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
                freq={item.initialFreq}
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
  isNormalInteger(str) {
    var n = Math.floor(Number(str));
    return String(n) === str && n >= 0;
  }

  onChange = (id, value) => {
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
