import React from 'react';
import SponsorTable from '../components/sponsors/sponsorTable';

export default function SponsorsPage(): JSX.Element {
  return (
    <div className="w-full h-screen overflow-y-auto">
      <SponsorTable />
    </div>
  );
}
