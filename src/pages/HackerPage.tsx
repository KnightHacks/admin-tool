import React from 'react';
import HackerTable from '../components/hackerTable';
import StatsParent from '../components/statsParent';
export default function HackerPage(): JSX.Element {
  return (
    <div>
      <p>Welcome to the hacker page!</p>
      <HackerTable />
      <StatsParent />
    </div>
  );
}
