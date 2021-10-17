import React, { useState } from 'react';
import Stats from './stats';
interface StatsInterface {
  hackers: number;
  sponsors: number;
  total: number;
}
export default function StatsParent(): JSX.Element {
  const [stats, setStats] = useState<StatsInterface>(Object);
  const statsURL = 'https://api.knighthacks.org/api​/stats​/user_count​/';
  fetch(statsURL, {
    method: 'GET',
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((data) => setStats(data))
    .catch((err) => {
      throw new Error(err);
    });
  console.log(stats);
  console.log(stats.hackers);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* {dummyData.map((stat) => (
        <Stats key={stat.statsName} data={stat} />
      ))} */}
    </div>
  );
}
