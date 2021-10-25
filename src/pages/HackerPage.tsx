import React, { useState, useEffect } from 'react';
import HackerTable from '../components/hackerTable';
import StatsComponent from '../components/StatsComponent';
import SponsorsComponent from '../components/SponsorsComponent';
import { useEndpoint } from '../api';

export default function HackerPage(): JSX.Element {
  const data = useEndpoint('http://localhost:5000/api/echo', { method: 'GET' });
  const [json, setJson] = useState(null);

  useEffect(() => {
    if (data !== null) {
      data.json().then((d) => setJson(d));
    }
  }, [data]);

  if (json === null) {
    return <p>Loading....</p>;
  }

  return (
    <div>
      <p>Welcome to the hacker page!</p>
      <p>{JSON.stringify(json)}</p>
      <HackerTable />
      <StatsComponent />
      <SponsorsComponent />
    </div>
  );
}
