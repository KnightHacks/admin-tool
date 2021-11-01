import React from 'react';
import HackerTable from '../components/hackers/hackerTable';
export default function HackerPage(): JSX.Element {
  return (
    <div className="overflow-y-auto">
      <HackerTable />
    </div>
  );
}
