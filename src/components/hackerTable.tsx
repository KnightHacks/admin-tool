import React, { useState, useEffect } from 'react';
import { API, HackerData } from '@knighthacks/hackathon';
import HackerRender from './hacker';
export default function HackerTable() {
  const [hacker, setHacker] = useState([]);
  useEffect(() => {
    const hackerURL =
      'https://api.knighthacks.org/api/hackers/get_all_hackers/';
    fetch(hackerURL, {
      method: 'GET',
      credentials: 'include',
    }).then((response) => console.log(response));
  }, []);
  // console.log(hacker);
  // const dummyData: HackerData[] = [
  //   {
  //     firstName: 'Johnny',
  //     lastName: 'Appleseed',
  //     pronouns: 'He/Him',
  //     beginner: true,
  //     rsvpStatus: false,
  //     isAccepted: false,
  //     email: 'test@test.com',
  //     username: 'test',
  //     password: 'test',
  //   },
  //   {
  //     firstName: 'Ya Boi',
  //     lastName: 'Test',
  //     pronouns: 'He/Him',
  //     beginner: false,
  //     rsvpStatus: true,
  //     isAccepted: true,
  //     email: 'test1@test.com',
  //     username: 'test',
  //     password: 'test',
  //   },
  // ];
  return (
    <div>
      <p />
    </div>
  );
}
