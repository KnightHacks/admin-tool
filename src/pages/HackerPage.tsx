import React from 'react';
import HackerTable from '../components/hackerTable';
export default function HackerPage(): JSX.Element {
  return (
    <div className="w-full h-screen bg-gray-800 mb-8 overflow-y-auto">
      <HackerTable />
    </div>
  );
}
