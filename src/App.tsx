import React from 'react';
import { Route, Switch, BrowserRouter, useHistory } from 'react-router-dom';
import './App.scss';
import HackerTable from './components/hackerTable';
import { API } from '@knighthacks/hackathon';
import LoginPage from './pages/Login';
import HackerPage from './pages/HackerPage';
const api = new API();
function App(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={LoginPage} />
              <Route path="/Hackers">
                <HackerPage />
              </Route>
            </Switch>
          </BrowserRouter>
        </p>
      </header>
    </div>
  );
}

export default App;
