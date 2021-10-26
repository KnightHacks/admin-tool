import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import KnightHacksLogo from '../assets/knightHacksLogoGold.svg';
import { loginRequest } from '../azure';
export default function LoginPage(): JSX.Element {
  const history = useHistory();
  const { instance } = useMsal();
  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch((e) => console.log(e));
  };
  const isAuthenticated = useIsAuthenticated();
  if (isAuthenticated) {
    history.push('/Hackers');
  }
  return (
    <div className="w-[calc(100%-10px)] sm:w-1/2 lg:w-1/4 bg-white rounded-lg px-8 py-4">
      <div className="flex flex-col items-center space-y-8">
        <img src={KnightHacksLogo} alt="Knight Hacks Logo" className="w-3/4" />
        <button
          onClick={() => handleLogin()}
          className="bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 px-4 py-2 w-full rounded-md font-semibold text-gray-900"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
