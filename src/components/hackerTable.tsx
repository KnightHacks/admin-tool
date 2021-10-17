import React, { useState, useEffect } from 'react';
import HackerRender from './hacker';
interface HackerData {
  hackers: [begginer: boolean];
}
export default function HackerTable() {
  const [hackerResponse, setHacker] = useState({ HackerData: Object });
  useEffect(() => {
    const hackerURL =
      'https://api.knighthacks.org/api/hackers/get_all_hackers/';
    fetch(hackerURL, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => setHacker(data));
  }, []);
  console.log(typeof hackerResponse['hackers'][0]);
  return (
    <div>
      {hackerResponse['hackers'].map((hacker) => (
        <HackerRender key={hacker['email']} data={hacker} />
      ))}
    </div>
  );
}
