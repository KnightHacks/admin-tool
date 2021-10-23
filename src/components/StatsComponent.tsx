import React, { useState, useEffect } from 'react';
interface StatsInterface {
  hackers: number;
  sponsors: number;
  total: number;
}
export default function StatsComponent(): JSX.Element {
  const [stats, setStats] = useState<StatsInterface>(Object);
  const statsURL = 'https://api.knighthacks.org/api/stats/user_count/';
  useEffect(() => {
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
  }, []);
  return (
    <div className="flex flex-wrap align-top justify-center items-center flex-rows gap-4 ">
      <div className="px-5 rounded-lg bg-red-500  items-center h-48 w-48 md:h-72 md:w-72 justify-center flex flex-col">
        <div className="text-6xl md:text-8xl font-bold text-white">
          {' '}
          {stats.hackers}{' '}
        </div>
        <p className="text-xl md:text-3xl text-white"> Hackers </p>
      </div>
      <div className="px-5 rounded-lg bg-blue-500 items-center h-48 w-48 md:h-72 md:w-72 justify-center flex flex-col">
        <div className="text-6xl md:text-8xl font-bold text-white">
          {' '}
          {stats.sponsors}{' '}
        </div>
        <p className="text-xl md:text-3xl text-white"> Sponsors </p>
      </div>
      <div className="px-5 rounded-lg bg-purple-500 h-48 w-48 md:h-72 md:w-72 items-center justify-center flex flex-col">
        <div className=" text-6xl md:text-8xl font-bold text-white"> XX </div>
        <p className=" text-xl md:text-3xl text-white"> Events </p>
      </div>
    </div>
  );
}
