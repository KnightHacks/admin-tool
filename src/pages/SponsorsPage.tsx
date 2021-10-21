import React from 'react';
import SponsorTable from '../components/sponsors/sponsorTable';
import SponsorSubmissionBar from '../components/sponsors/sponsorSubmission';

export default function SponsorPage(): JSX.Element {
  return (
    <div>
      <p>Welcome to the Sponsors page!</p>
      <SponsorSubmissionBar />
      <SponsorTable />
    </div>
  );
}
