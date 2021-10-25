import React from 'react';
import HackerTable from '../components/hackers/hackerTable';
export default function HackerPage(): JSX.Element {
  return (
    <div className="w-full h-screen mb-8 overflow-y-auto">
      <HackerTable />
    </div>
  );
}
