import React from 'react';
import './App.scss';
import HackerTable from './components/hackerTable';
import { API } from '@knighthacks/hackathon';

const api = new API();
function App(): JSX.Element {
  return <HackerTable api={api} />;
}

export default App;
