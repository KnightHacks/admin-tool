import React, { useState, useEffect } from 'react';
import HackerRender from './hacker';
export default function HackerTable() {
  const [hackerData, setHacker] = useState([]);
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
  console.log(hackerData);
  return (
    <div>
      {hackerData['hackers'].map((hacker) => (
        <HackerRender key={hacker['email']} data={hacker} />
      ))}
    </div>
  );
}
