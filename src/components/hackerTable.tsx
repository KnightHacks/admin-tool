import React, { useState, useEffect } from 'react';
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
      {hackers.map((hacker) => (
        <HackerRender key={hacker['email']} data={hacker} />
      ))}
    </div>
  );
}
