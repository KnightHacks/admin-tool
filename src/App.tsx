import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/Login';
import HackerPage from './pages/HackerPage';
import StatsPage from './pages/StatsPage';
function App(): JSX.Element {
  return (
    <div className="bg-gray-800 w-screen h-screen flex justify-center items-center">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/Hackers">
            <HackerPage />
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
