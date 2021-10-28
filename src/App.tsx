import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import LoginPage from './pages/Login';
import HackerPage from './pages/HackerPage';
import SponsorPage from './pages/SponsorsPage';

function App(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Redirect to="/Sponsors" />
              {/*<LoginPage />*/}
            </Route>
            <Route path="/Hackers">
              <HackerPage />
            </Route>
            <Route path="/Sponsors">
              <SponsorPage />
            </Route>
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
