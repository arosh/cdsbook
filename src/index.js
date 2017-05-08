import React from 'react';
import ReactDOM from 'react-dom';
import { ShannonFanoCode } from './services/ShannonFanoCode';

const App = () => (
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
        <tr>
          <th scope="row">1</th>
          <td><input type="text" className="form-control" /></td>
        </tr>
      </tbody>
    </table>
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('react-root')
);

const shannonFanoCode = new ShannonFanoCode([0.6, 0.3, 0.05, 0.025, 0.025]);
console.log(shannonFanoCode.buildPrefixCode());
