import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  SponsorRender,
  Sponsor,
  SponsorRenderProps,
  SponsorTier,
  getSponsorTierString,
} from './sponsor';

export default function HackerTable(): JSX.Element {
  const history = useHistory();
  const [sponsors, setSponsors] = useState<Array<Sponsor>>([]);

  useEffect(() => {
    const sponsorsCopy = [...sponsors];
    sponsorsCopy.push({
      name: 'Demo Sponsor',
      description:
        'This is not a real sponsor, but is rather being used to determine if this would work.',
      subscription_tier: SponsorTier.Gold,
      linkedin: 'https://www.linkedin.com/in/elijahmsmith/',
    });

    setSponsors(sponsorsCopy);
  }, []);

  return (
    <div>
      {sponsors.map((sponsor) => (
        <SponsorRender key={sponsor.name} data={sponsor} />
      ))}
    </div>
  );
}
