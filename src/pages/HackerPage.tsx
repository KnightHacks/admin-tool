import React from 'react';
import HackerTable from '../components/hackerTable';
import StatsComponent from '../components/StatsComponent';
import SponsorsComponent from '../components/SponsorsComponent';
export default function HackerPage(): JSX.Element {
  return (
    <div>
      <p>Welcome to the hacker page!</p>
      <HackerTable />
      <StatsComponent />
      <SponsorsComponent />
    </div>
  );
}
