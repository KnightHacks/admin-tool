import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import LoginPage from './pages/Login';
import HackerPage from './pages/HackerPage';
import SponsorsPage from './pages/SponsorsPage';
import StatsPage from './pages/StatsPage';
function App(): JSX.Element {
  return (
    <div className="bg-dark-gray w-screen h-screen flex justify-center items-center">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/Sponsors" />
          </Route>
          <Route path="/Hackers">
            <HackerPage />
          </Route>
          <Route path="/Sponsors">
            <SponsorsPage />
          </Route>
          <Route path="/Stats">
            <StatsPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
