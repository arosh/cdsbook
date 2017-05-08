import React from 'react';
import ReactDOM from 'react-dom';
import { ShannonFanoCode } from './services/ShannonFanoCode';

const Item = ({ id, onChange, initialFreq, codeLength, code }) => (
  <tr>
    <th scope="row">{id}</th>
    <td>
      <input
        type="text"
        className="form-control"
        defaultValue={initialFreq}
        onChange={(e) => onChange(id, e.target.value)} />
    </td>
    <td>{codeLength}</td>
    <td>{code}</td>
  </tr>
);

class App extends React.Component {
  constructor() {
    super();
    this.itemRefs = {}
    this.onChange = this.onChange.bind(this);
    // const frequencies = [600, 300, 50, 25, 25];
    const frequencies = [1, 1, 1];
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
    this.state = {
      items,
    }
  }

  render() {
    // http://bootsnipp.com/snippets/featured/dynamic-table-row-creation-and-deletion
    return (
      <div>
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
            {this.state.items.map(item =>
              <Item
                key={item.id}
                id={item.id}
                onChange={this.onChange}
                initialFreq={item.initialFreq}
                codeLength={item.codeLength}
                code={item.code} />
            )}
          </tbody>
        </table>
        <button type="button" className="btn btn-default pull-left">Add Row</button>
        <button type="button" className="btn btn-default pull-right">Delete Row</button>
      </div>
    );
  }

  onChange(id, value) {
    console.log(id, value);
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('react-root')
);

const shannonFanoCode = new ShannonFanoCode([0.6, 0.3, 0.05, 0.025, 0.025]);
console.log(shannonFanoCode.buildPrefixCode());
