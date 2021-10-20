import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import KnightHacksLogo from '../assets/knightHacksLogoGold.svg';
import * as config from '../config.json';
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
    // const authURL = 'https://api.knighthacks.org/api/auth/login/';
    // const loginData = {
    //   password: password,
    //   username: username,
    // };
    // fetch(authURL, {
    //   method: 'POST',
    //   credentials: 'include',
    //   headers: {
    //     'content-type': 'application/json',
    //   },
    //   body: JSON.stringify(loginData),
    // })
    //   .then((response) => setStatusCode(response.status))
    //   .catch((err) => {
    //     throw new Error(err);
    //   });
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
    <div>
      <img src={KnightHacksLogo} alt="Knight Hacks Logo" />
      <p>Login</p>
      <p>{StatusMessage}</p>
      <input type="text" placeholder="Username" onChange={UsernameCapture} />
      <input
        type="password"
        placeholder="Password"
        onChange={PasswordCapture}
      />
      <a href={config.redirect_url}>Log on</a>
    </div>
  );
}
