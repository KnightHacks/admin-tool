import React from 'react';
import HackerTable from '../components/hackerTable';
import StatsComponent from '../components/StatsComponent';
import SponsorsComponent from '../components/SponsorsComponent';

export default function HackerPage(): JSX.Element {
  return (
    <div className="overflow-y-auto">
      <HackerTable />
      <StatsComponent />
      <SponsorsComponent />
    </div>
  );
}
