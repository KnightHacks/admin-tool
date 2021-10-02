import React from 'react';
import './App.scss';
import HackerTable from './components/hackerTable';
import { API } from '@knighthacks/hackathon';
const api = new API();
function App(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
          <HackerTable api={api} />
        </p>
      </header>
    </div>
  );
}

export default App;
