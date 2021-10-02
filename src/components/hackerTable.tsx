// import React, { useState, useEffect } from 'react';
import React from 'react';
import { API, HackerData } from '@knighthacks/hackathon';
import HackerRender from './hacker';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function HackerTable({ api }: { api: API }): JSX.Element {
  // const [hacker, setHacker] = useState<Hacker[]>([]);
  // useEffect(() => {
  //   void (async function reset() {
  //     const hackers = await api.hackers.fetchAll();
  //     console.log(hackers);
  //     setHacker(hackers);
  //   })();
  // }, []);
  // console.log(hacker);
  const dummyData: HackerData[] = [
    {
      firstName: 'Johnny',
      lastName: 'Appleseed',
      pronouns: 'He/Him',
      beginner: true,
      rsvpStatus: false,
      isAccepted: false,
      email: 'test@test.com',
      username: 'test',
      password: 'test',
    },
    {
      firstName: 'Ya Boi',
      lastName: 'Test',
      pronouns: 'He/Him',
      beginner: false,
      rsvpStatus: true,
      isAccepted: true,
      email: 'test1@test.com',
      username: 'test',
      password: 'test',
    },
  ];
  return (
    <div>
      {dummyData.map((hacker) => (
        <HackerRender key={hacker.email} data={hacker} />
      ))}
    </div>
  );
}
