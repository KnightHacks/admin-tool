import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { SponsorRender, Sponsor, SponsorTier } from './sponsor';

interface TableParams {
  sponsorList: Sponsor[];
}

export default function SponsorTable({
  sponsorList,
}: TableParams): JSX.Element {
  const history = useHistory();

  return (
    <div>
      {sponsorList.map((sponsor) => (
        <SponsorRender key={sponsor.name} data={sponsor} />
      ))}
    </div>
  );
}
