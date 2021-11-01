import React, { useEffect, useState } from 'react';
import { SponsorRender, Sponsor } from './sponsor';
import SponsorForm from './sponsorFormModal';
import { Snackbar, Alert } from '@mui/material';

interface SponsorSchema {
  sponsor_name: string;
  subscription_tier: string;
  sponsor_website: string;
  description: string;
  logo: string;
}

function getTierNumber(sponsor: Sponsor): number {
  switch (sponsor.tier.toLowerCase()) {
    case 'diamond':
      return 1;
    case 'platinum':
      return 2;
    case 'gold':
      return 3;
    case 'silver':
      return 4;
    case 'bronze':
      return 5;
  }
  return 6;
}

function compareSponsors(sponsor1: Sponsor, sponsor2: Sponsor) {
  const val = getTierNumber(sponsor1) - getTierNumber(sponsor2);
  if (val !== 0) return val;
  return sponsor1.name.localeCompare(sponsor2.name);
}

export default function SponsorTable(): JSX.Element {
  const [sponsors, setSponsors] = useState<Array<Sponsor>>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('An error occurred!');

  const closeSnackbar = (): void => {
    setSnackbarOpen(false);
  };

  const openSnackbar = (message = 'An error occurred!', error = true): void => {
    setFetchError(error);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  useEffect(() => {
    const sponsorURL =
      process.env.REACT_APP_API_URL + '/api/sponsors/get_all_sponsors/';
    fetch(sponsorURL, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data != null && data.sponsors != null && data.sponsors.length > 0) {
          const sponsorsAdjusted = data.sponsors.map((obj: SponsorSchema) => {
            return {
              name: obj.sponsor_name,
              website: obj.sponsor_website,
              description: obj.description,
              tier: obj.subscription_tier,
              logo: null, // No endpoint available at present
            };
          });
          sponsorsAdjusted.sort(compareSponsors);
          setSponsors(sponsorsAdjusted);
        } else setSponsors([]);
        openSnackbar('Sponsors retrieved!', false);
      })
      .catch((error) => {
        openSnackbar('Error retrieving sponsors!', true);
        console.log(error);
      });
  }, []);

  function addSponsor(newSponsor: Sponsor): void {
    const sponsorURL = process.env.REACT_APP_API_URL + '/api/sponsors/';
    fetch(sponsorURL, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        sponsor_name: newSponsor.name,
        description:
          newSponsor.description === ''
            ? 'No description provided.'
            : newSponsor.description,
        subscription_tier: newSponsor.tier,
        sponsor_website: newSponsor.website,
        logo: '', // No endpoint available at present
      }),
    })
      .then(() => {
        openSnackbar('Sponsor created!', false);
      })
      .catch((error) => {
        openSnackbar('Error creating sponsors!', true);
        console.log(error);
      });

    const sponsorsAdjusted = [...sponsors, newSponsor];
    sponsorsAdjusted.sort(compareSponsors);
    setSponsors(sponsorsAdjusted);
  }

  return (
    <div className="h-screen">
      <div className="flex items-center justify-center my-8">
        <button
          className="py-3 px-8 text-2xl text-yellow-400 border-2 border-yellow-400 rounded-lg font-bold transition duration-500 ease-in-out transform hover:scale-110"
          onClick={() => setFormOpen(true)}
        >
          New Sponsor
        </button>
      </div>
      <div className="px-5">
        <div className="flex flex-col items-center justify-center gap-3">
          {sponsors.map((sponsor) => (
            <SponsorRender key={sponsor.name} sponsor={sponsor} />
          ))}
        </div>
      </div>
      {formOpen ? (
        <SponsorForm
          handleSubmission={(newSponsorObj: Sponsor) => {
            addSponsor(newSponsorObj);
            setFormOpen(false);
          }}
          handleClose={() => {
            setFormOpen(false);
          }}
        />
      ) : null}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={closeSnackbar}
      >
        <Alert
          onClose={closeSnackbar}
          severity={fetchError ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
