import React, { useState, useEffect } from 'react';
import HackerRender from './hacker';
interface HackerData {
  beginner: boolean;
}
export default function HackerTable() {
  const [hackerResponse, setHacker] = useState({ HackerData: [] });
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
  console.log(hackerResponse);
  console.log('first object is: ', hackerResponse[0]);
  console.log(typeof hackerResponse[0]);
  return (
    <div>
      {/* {hackerResponse.map((hacker) => (
        <HackerRender key={hacker['email']} data={hacker} />
      ))} */}
    </div>
  );
}
