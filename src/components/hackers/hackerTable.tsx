import React, { useState, useEffect } from 'react';
import HackerRender from './hacker';
import { useEndpoint } from '../../api';
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
  const [hackers, setHacker] = useState<Array<Hacker>>([]);
  const d = useEndpoint(
    process.env.REACT_APP_API_URL + '/api/hackers/get_all_hackers/',
  );
  useEffect(() => {
    if (d) {
      setHacker(d.hackers ?? []);
    }
  });
  return (
    <div className="h-full my-8 flex flex-col items-center justify-center gap-3">
      {hackers.map((hacker) => (
        <HackerRender key={hacker['email']} data={hacker} />
      ))}
    </div>
  );
}
