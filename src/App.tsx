import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
