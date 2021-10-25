import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import KnightHacksLogo from '../assets/knightHacksLogoGold.svg';
export default function LoginPage(): JSX.Element {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [statusCode, setStatusCode] = useState(0);
  const [StatusMessage, setStatusMessage] = useState('');
  const history = useHistory();
  function UsernameCapture(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }
  function PasswordCapture(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }
  function Login() {
    const authURL = 'https://api.knighthacks.org/api/auth/login/';
    const loginData = {
      password: password,
      username: username,
    };
    fetch(authURL, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => setStatusCode(response.status))
      .catch((err) => {
        throw new Error(err);
      });
    switch (statusCode) {
      case 200:
        setStatusMessage('Now logging in!');
        history.push('/Hackers');
        break;
      case 400:
        setStatusMessage('Login has failed, please try again later');
        break;
      case 404:
        setStatusMessage('User not found');
        break;
      case 403:
        setStatusMessage('Forbidden');
        break;
      case 0:
        setStatusMessage('Request has not fully finished, try again!');
        break;
    }
  }
  return (
    <div className="w-[calc(100%-10px)] sm:w-1/2 lg:w-1/4 bg-white rounded-lg px-8 py-4">
      <div className="flex flex-col items-center space-y-8">
        <img src={KnightHacksLogo} alt="Knight Hacks Logo" className="w-3/4" />
        <input
          type="text"
          placeholder="Username"
          onChange={UsernameCapture}
          className={`shadow appearance-none border ${
            StatusMessage === '' ? 'border-gray-500' : ' border-red-500'
          } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-200`}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={PasswordCapture}
          className={`shadow appearance-none border ${
            StatusMessage === '' ? 'border-gray-500' : ' border-red-500'
          } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-200`}
        />
        <button
          onClick={Login}
          className="bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 px-4 py-2 w-full rounded-md font-semibold text-gray-900"
        >
          Sign In
        </button>
      </div>
      <p
        className={`${
          StatusMessage === '' ? 'hidden' : 'block'
        } text-red-500 mt-2 text-center`}
      >
        {StatusMessage}
      </p>
    </div>
  );
}
