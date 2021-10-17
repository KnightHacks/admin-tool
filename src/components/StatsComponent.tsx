import React, { useState } from 'react';
interface StatsInterface {
  hackers: number;
  sponsors: number;
  total: number;
}
export default function StatsComponent(): JSX.Element {
  const [stats, setStats] = useState<StatsInterface>(Object);
  const statsURL = 'https://api.knighthacks.org/api/stats/user_count/';
  fetch(statsURL, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => setStats(data))
    .catch((err) => {
      throw new Error(err);
    });
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p>Total hackers: {stats.hackers}</p>
      <p>Total sponsors: {stats.sponsors}</p>
      <p>Total: {stats.total}</p>
    </div>
  );
}
