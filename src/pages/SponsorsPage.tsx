import React from 'react';
import SponsorsSubmission from '../components/sponsors/sponsorSubmission';
import SponsorTable from '../components/sponsors/sponsorTable';
import '../components/sponsors/sponsorPage.scss';

export default function SponsorPage(): JSX.Element {
  return (
    <div className="sponsorPageContainer">
      <p>Welcome to the Sponsors page!</p>
      <SponsorsSubmission />
      <SponsorTable />
    </div>
  );
}
