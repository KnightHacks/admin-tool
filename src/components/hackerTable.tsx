import React, { useState, useEffect } from 'react';
import { API } from '@knighthacks/hackathon';

const HackerTable = async ({ api }: { api: API }) => {
  const [data, setData] = useState({ api: [] });
  const hacker = await api.hackers.fetch('Bob');
  console.log(hacker);
  return <p>Yo</p>;
};

export default HackerTable;
