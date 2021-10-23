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

function Dashboard(): JSX.Element {
  const { path, url } = useRouteMatch();
  const history = useHistory();
  return (
    <div className="min-h-screen flex flex-row bg-gray-800">
      <div className="flex flex-col w-56 bg-gray-200 rounded-r-3xl overflow-hidden">
        <div className="flex items-center justify-center h-20 shadow-md">
          <img
            src={KnightHacksLogo}
            alt="Knight Hacks Logo"
            className="w-3/4"
          />
        </div>
        <ul className="flex flex-col py-4">
          <li>
            <Link
              to={url}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12">
                <ViewBoardsIcon className="w-6" />
              </span>
              <span className="text-sm font-medium">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to={`${url}/hackers`}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12">
                <UserIcon className="w-6 " />
              </span>
              <span className="text-sm font-medium">Hackers</span>
            </Link>
          </li>
          <li>
            <Link
              to={`${url}/sponsors`}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12">
                <CurrencyDollarIcon className="w-6 " />
              </span>
              <span className="text-sm font-medium">Sponsors</span>
            </Link>
          </li>
          <li>
            <Link
              to={`${url}/events`}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12">
                <CalendarIcon className="w-6" />
              </span>
              <span className="text-sm font-medium">Events</span>
            </Link>
          </li>
          <li>
            <div
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800 cursor-pointer"
              onClick={() => {
                history.replace('/');
              }}
            >
              <span className="inline-flex items-center justify-center h-12 w-12">
                <LogoutIcon className="w-6" />
              </span>
              <span className="text-sm font-medium">Logout</span>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex flex-1">
        <Switch>
          <Route path={`${path}/hackers`}>
            <HackerPage />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Dashboard;
