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
  what_learn: Array<string>;
  why_attend: Array<string>;
}
export default function HackerTable(): JSX.Element {
  const history = useHistory();

  const sampleData1 = {
    email: 'test@knights.ucf.edu',
    isaccepted: false,
    rsvp_status: false,
    first_name: 'John',
    last_name: 'Doe',
    date: '2021-10-14T00:39:57+0000',
    beginner: false,
    edu_info: {
      college: 'COLLEGE',
      graduation_date: 'May 2023',
      level_of_study: 'Undergraduation',
      major: 'COMPUTER SCIENCE',
    },
    socials: {
      github: 'https://github.com/User',
      linkedin: 'https://linkedin.com/User',
    },
    what_learn: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ],
    why_attend: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit pellentesque habitant morbi tristique senectus et. Accumsan sit amet nulla facilisi morbi tempus iaculis. Quisque id diam vel quam elementum pulvinar etiam non quam.',
    ],
  };
  const sampleData2 = {
    email: 'test@knights.ucf.edu',
    isaccepted: true,
    rsvp_status: true,
    first_name: 'John',
    last_name: 'Doe',
    date: '2021-10-14T00:39:57+0000',
    beginner: true,
    edu_info: {
      college: 'COLLEGE',
      graduation_date: 'May 2023',
      level_of_study: 'Undergraduation',
      major: 'COMPUTER SCIENCE',
    },
    socials: {
      github: 'https://github.com/User',
      linkedin: 'https://linkedin.com/User',
    },
    what_learn: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ],
    why_attend: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit pellentesque habitant morbi tristique senectus et. Accumsan sit amet nulla facilisi morbi tempus iaculis. Quisque id diam vel quam elementum pulvinar etiam non quam.',
    ],
  };
  const sampleData3 = {
    email: 'test@knights.ucf.edu',
    isaccepted: true,
    rsvp_status: false,
    first_name: 'John',
    last_name: 'Doe',
    date: '2021-10-14T00:39:57+0000',
    beginner: true,
    edu_info: {
      college: 'COLLEGE',
      graduation_date: 'May 2023',
      level_of_study: 'Undergraduation',
      major: 'COMPUTER SCIENCE',
    },
    socials: {
      github: 'https://github.com/User',
      linkedin: 'https://linkedin.com/User',
    },
    what_learn: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ],
    why_attend: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit pellentesque habitant morbi tristique senectus et. Accumsan sit amet nulla facilisi morbi tempus iaculis. Quisque id diam vel quam elementum pulvinar etiam non quam.',
    ],
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
