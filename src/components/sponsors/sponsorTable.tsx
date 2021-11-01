import React, { useEffect, useState } from 'react';
import { SponsorRender, Sponsor } from './sponsor';
import KnightHacksLogo from '../../assets/knightHacksLogoGold.svg';
import SponsorForm from './sponsorFormModal';
import { Snackbar, Alert } from '@mui/material';
import dummyArray from './dummySponsors';

interface SponsorSchema {
  sponsor_name: string;
  subscription_tier: string;
  sponsor_website: string;
  description: string;
  logo: string;
}

export default function SponsorTable(): JSX.Element {
  const [sponsors, setSponsors] = useState<Array<Sponsor>>(dummyArray);
  const [formOpen, setFormOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('An error occurred!');

  const handleClose = (): void => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const sponsorURL =
      'https://stagingapi.knighthacks.org/api/sponsors/get_all_sponsors/';
    fetch(sponsorURL, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(
          data != null && data.sponsors != null && data.sponsors.length > 0,
        );
        if (data != null && data.sponsors != null && data.sponsors.length > 0)
          setSponsors(
            data.sponsors.map((obj: SponsorSchema) => {
              return {
                name: obj.sponsor_name,
                website: obj.sponsor_website,
                description: obj.description,
                tier: obj.subscription_tier,
                logo: null,
              };
            }),
          );
        else setSponsors([]);
        setSnackbarOpen(true);
        setFetchError(false);
        setSnackbarMessage('Sponsors retrieved!');
      })
      .catch((error) => {
        setSnackbarOpen(true);
        setFetchError(true);
        setSnackbarMessage('Error retrieving sponsors!');
        console.log(error);
      });
  }, []);

  function addSponsor(newSponsor: Sponsor): void {
    const sponsorURL = 'https://stagingapi.knighthacks.org/api/sponsors/';
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
        logo: '',
      }),
    })
      .then(() => {
        setSnackbarOpen(true);
        setFetchError(false);
        setSnackbarMessage('Sponsor created!');
      })
      .catch((error) => {
        setSnackbarOpen(true);
        setFetchError(true);
        setSnackbarMessage('Error creating sponsor!');
        console.log(error);
      });

    // TODO: Remove before pushing
    setSponsors([...sponsors, newSponsor]);
  }

  return (
    <div>
      <nav className="fixed top-0 z-10 w-screen grid grid-cols-2 bg-dark-gray drop-shadow-lg mb-3">
        <div className="flex justify-start items-center mx-8 my-4">
          <a
            className="text-sm font-bold leading-relaxed inline-block py-2 whitespace-nowrap uppercase text-white"
            href="/"
          >
            <img className="h-10 w-auto object-contain" src={KnightHacksLogo} />
          </a>
        </div>
        <div className="flex flex-grow items-center mx-8 justify-end gap-2">
          <button
            className="py-3 px-8 text-yellow-400 border-2 border-yellow-400 rounded-lg font-bold transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            onClick={() => setFormOpen(true)}
          >
            New Sponsor
          </button>
        </div>
      </nav>
      <div className="h-screen mt-24 w-full px-5 py-8">
        <div className="flex flex-col mx-0 px-0 items-center justify-center gap-3">
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
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={fetchError ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
