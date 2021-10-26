import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HackerRender from './hacker';
import KnightHacksLogo from '../assets/knightHacksLogoGold.svg';
interface Hacker {
  email: string;
  isaccepted: boolean;
  rsvp_status: boolean;
  first_name: string;
  last_name: string;
  beginner: boolean;
  date: string;
  edu_info: {
    college: string;
    graduation_date: string;
    level_of_study: string;
    major: string;
  };
  socials: {
    github: string;
    linkedin: string;
  };
  email_verification: boolean;
  what_learn: Array<string>;
  why_attend: Array<string>;
}
export default function HackerTable(): JSX.Element {
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
  const [hackers, setHacker] = useState<Array<Hacker>>([]);
  useEffect(() => {
    const hackerURL =
      process.env.REACT_APP_API_URL + '/api/hackers/get_all_hackers/';
    fetch(hackerURL, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => setHacker(data.hackers ?? []));
  }, []);
  return (
    <div>
      <nav className="fixed top-0 z-10 w-screen grid grid-cols-2 bg-dark-gray drop-shadow-lg mb-3">
        <div className="flex justify-start items-center mx-8 my-4">
          <a
            className="text-sm font-bold leading-relaxed inline-block  py-2 whitespace-nowrap uppercase text-white"
            href="/"
          >
            <img className="h-10 w-auto object-contain" src={KnightHacksLogo} />
          </a>
        </div>
        <div className="flex flex-grow items-center mx-8 justify-end gap-2">
          <button
            className="py-3 px-8 text-yellow-400 border-2 border-yellow-400 rounded-lg  font-bold transition duration-500 ease-in-out  transform hover:-translate-y-1 hover:scale-110"
            onClick={() => Logout()}
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="h-screen mt-24 w-full px-5 py-8">
        <div className="flex flex-col mx-0 px-0 items-center justify-center gap-3">
          {hackers.map((hacker) => (
            <HackerRender key={hacker['email']} data={hacker} />
          ))}
        </div>
      </div>
    </div>
  );
}
