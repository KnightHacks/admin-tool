import React, { useState, useEffect } from 'react';
export default function SponsorsSubmission(): JSX.Element {
  const [sponsorName, setSponsorName] = useState('');
  const [sponsorTier, setSponsorTier] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [statusCode, setStatusCode] = useState(0);
  const [statusText, setStatusText] = useState('');
  function LinkedinCapture(event: React.ChangeEvent<HTMLInputElement>) {
    setLinkedIn(event.target.value);
  }
  function SponsorNameCapture(event: React.ChangeEvent<HTMLInputElement>) {
    setSponsorName(event.target.value);
  }
  function LogoCapture(event: React.ChangeEvent<HTMLInputElement>) {
    setLogo(event.target.value);
  }
  function TierCapture(event: React.ChangeEvent<HTMLInputElement>) {
    setSponsorTier(event.target.value);
  }
  function DescriptionCapture(event: React.ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);
  }
  function CreateSponsor() {
    const sponsorObject = {
      description: description,
      logo: logo,
      socials: {
        linkedIn: linkedIn,
      },
      sponsor_name: sponsorName,
      subscription_tier: sponsorTier,
    };
    const sponsorCreationURL = 'https://api.knighthacks.org/api/sponsors/';
    useEffect(() => {
      fetch(sponsorCreationURL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(sponsorObject),
      })
        .then((response) => setStatusCode(response.status))
        .catch((err) => {
          throw new Error(err);
        });
    }, []);
    if (statusCode === 409) {
      setStatusText(sponsorName + ' already exist in the database, aborting!');
    } else if (statusCode === 201) {
      setStatusText(sponsorName + ' has been added successfully!');
    }
  }
  return (
    <div className="barContainer">
      <p>{statusText}</p>
      <div className="upperFieldContainer">
        <label>Sponsor Name</label>
        <input type="text" onChange={SponsorNameCapture} />
        <label>Description</label>
        <input type="text" onChange={DescriptionCapture} />
        <label>Linkedin</label>
        <input type="text" onChange={LinkedinCapture} />
      </div>

      <div className="lowerFieldContainer">
        <label>Subscription Tier</label>
        <input type="text" onChange={TierCapture} />
        <label>Logo</label>
        <input type="text" onChange={LogoCapture} />
        <button onClick={CreateSponsor}>Submit</button>
      </div>
    </div>
  );
}
