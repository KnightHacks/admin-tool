import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HackerRender from './hacker';
interface Hacker {
  email: string;
  isaccepted: boolean;
  rsvp_status: boolean;
  first_name: string;
  last_name: string;
  beginner: boolean;
}
export default function HackerTable(): JSX.Element {
  const history = useHistory();

  const sampleData1 = {
    email: 'test@knights.ucf.edu',
    isaccepted: false,
    rsvp_status: false,
    first_name: 'John',
    last_name: 'Doe',
    beginner: false,
  };
  const sampleData2 = {
    email: 'test@knights.ucf.edu',
    isaccepted: true,
    rsvp_status: true,
    first_name: 'John',
    last_name: 'Doe',
    beginner: true,
  };
  const sampleData3 = {
    email: 'test@knights.ucf.edu',
    isaccepted: true,
    rsvp_status: false,
    first_name: 'John',
    last_name: 'Doe',
    beginner: true,
  };

  const sampleHackers = [];

  for (let i = 0; i < 4; i++) {
    sampleHackers.push(sampleData1);
    sampleHackers.push(sampleData2);
    sampleHackers.push(sampleData3);
  }

  function Logout() {
    const logoutURL = 'https://api.knighthacks.org/api/auth/signout/';
    fetch(logoutURL, {
      method: 'GET',
      credentials: 'include',
    }).catch((err) => {
      throw new Error(err);
    });
    history.push('/');
  }
  const [hackers, setHacker] = useState<Array<Hacker>>([]);
  console.log(hackers[0]);
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
  return (
    <div className="max-h-screen overflow-y-auto mt-5 px-5">
      <button className="button is-danger" onClick={() => Logout()}>
        Logout
      </button>
      <div className="flex no-wrap flex-col gap-3">
        {sampleHackers.map((hacker) => (
          <HackerRender key={hacker['email']} data={hacker} />
        ))}
      </div>
    </div>
  );
}
