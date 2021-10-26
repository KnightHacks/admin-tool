import React, { useState, useEffect } from 'react';
import SponsorsSubmission from '../components/sponsors/sponsorSubmission';
import SponsorTable from '../components/sponsors/sponsorTable';
import { SponsorTier, Sponsor } from '../components/sponsors/sponsor';
import { dummyArray } from '../components/sponsors/dummySponsors';

export default function SponsorPage(): JSX.Element {
  const [sponsors, setSponsors] = useState<Array<Sponsor>>(dummyArray);

  function addSponsor(newSponsor: Sponsor): void {
    setSponsors([...sponsors, newSponsor]); //simple value
  }

  return (
    <div className="sponsorPageContainer">
      <SponsorsSubmission onCreateSponsor={addSponsor} />
      <SponsorTable sponsorList={sponsors} />
    </div>
  );
}
