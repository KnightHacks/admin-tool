import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HackerRender from './hacker';
interface Hacker {
  email: string;
  is_accepted: boolean;
  rsvp_status: boolean;
  first_name: string;
  last_name: string;
  beginner: boolean;
}
export default function HackerTable() {
  const history = useHistory();
  function Logout() {
    const logoutURL = 'https://api.knighthacks.org/api/auth/login/';
    fetch(logoutURL, {
      method: 'GET',
    }).catch((err) => {
      throw new Error(err);
    });
    history.push('/');
  }
  const [hackers, setHacker] = useState<Array<Hacker>>([]);
  useEffect(() => {
    const hackerURL =
      'https://api.knighthacks.org/api/hackers/get_all_hackers/';
    fetch(hackerURL, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => setHacker(data.hackers ?? []));
  }, []);
  console.log(hackers[0]);
  console.log('first object is: ', hackers[0]);
  console.log(typeof hackers[0]);
  return (
    <div>
      <button onClick={() => Logout()}>Logout</button>
      {hackers.map((hacker) => (
        <HackerRender key={hacker['email']} data={hacker} />
      ))}
    </div>
  );
}
