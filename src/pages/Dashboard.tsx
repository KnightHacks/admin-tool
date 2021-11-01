import React from 'react';
import KnightHacksLogo from '../assets/knightHacksLogoGold.svg';
import HackerPage from './HackerPage';
import {
  Route,
  Switch,
  Link,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';

import {
  CalendarIcon,
  CurrencyDollarIcon,
  LogoutIcon,
  UserIcon,
  ViewBoardsIcon,
} from '@heroicons/react/outline';
import StatsPage from './StatsPage';

function Dashboard(): JSX.Element {
  const { path, url } = useRouteMatch();
  const history = useHistory();
  function Logout() {
    const logoutURL = process.env.REACT_APP_API_URL + '/api/auth/signout/';
    fetch(logoutURL, {
      method: 'GET',
      credentials: 'include',
    }).catch((err) => {
      throw new Error(err);
    });
    history.push('/');
  }
  return (
    <div className="min-h-screen flex flex-row bg-dark-gray">
      <div className="flex flex-col w-16 md:w-72 bg-med-gray overflow-hidden">
        <div className="flex items-center justify-center h-20 shadow-md">
          <img
            src={KnightHacksLogo}
            alt="Knight Hacks Logo"
            className="w-3/4"
          />
        </div>
        <ul className="flex flex-col py-4 md:pl-4">
          <li>
            <Link
              to={url}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-light-gray hover:text-yellow-300"
            >
              <span className="inline-flex items-center justify-center h-12 w-12">
                <ViewBoardsIcon className="w-6" />
              </span>
              <span className="text-sm font-medium hidden md:block">
                Dashboard
              </span>
            </Link>
          </li>
          <li>
            <Link
              to={`${url}/hackers`}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-light-gray hover:text-yellow-300"
            >
              <span className="inline-flex items-center justify-center h-12 w-12">
                <UserIcon className="w-6 " />
              </span>
              <span className="text-sm font-medium hidden md:block">
                Hackers
              </span>
            </Link>
          </li>
          <li>
            <Link
              to={`${url}/sponsors`}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-light-gray hover:text-yellow-300"
            >
              <span className="inline-flex items-center justify-center h-12 w-12">
                <CurrencyDollarIcon className="w-6 " />
              </span>
              <span className="text-sm font-medium hidden md:block">
                Sponsors
              </span>
            </Link>
          </li>
          <li>
            <Link
              to={`${url}/events`}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-light-gray hover:text-yellow-300"
            >
              <span className="inline-flex items-center justify-center h-12 w-12">
                <CalendarIcon className="w-6" />
              </span>
              <span className="text-sm font-medium hidden md:block">
                Events
              </span>
            </Link>
          </li>
          <li>
            <div
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-light-gray hover:text-yellow-300 cursor-pointer"
              onClick={() => {
                history.replace('/');
              }}
            >
              <span
                className="inline-flex items-center justify-center h-12 w-12"
                onClick={Logout}
              >
                <LogoutIcon className="w-6" />
              </span>
              <span className="text-sm font-medium hidden md:block">
                Logout
              </span>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <Switch>
          <Route exact path={path}>
            <StatsPage />
          </Route>
          <Route path={`${path}/hackers`}>
            <HackerPage />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Dashboard;
