import React from 'react';
import HackerTable from '../components/hackers/hackerTable';
import StatsComponent from '../components/StatsComponent';
import SponsorsComponent from '../components/sponsors/sponsorSubmission';
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
