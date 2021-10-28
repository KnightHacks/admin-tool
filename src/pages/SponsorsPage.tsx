import React from 'react';
import SponsorTable from '../components/sponsors/sponsorTable';

export default function SponsorsPage(): JSX.Element {
  return (
    <div className="w-full h-screen mb-8 overflow-y-auto">
      <SponsorTable />
    </div>
  );
}
