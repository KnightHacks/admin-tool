import React, { useState } from 'react';
import { SponsorRender, Sponsor } from './sponsor';
import KnightHacksLogo from '../../assets/knightHacksLogoGold.svg';
import { dummyArray } from './dummySponsors';
import SponsorForm from './sponsorFormModal';

export default function SponsorTable(): JSX.Element {
  const [sponsors, setSponsors] = useState<Array<Sponsor>>(dummyArray);
  const [formOpen, setFormOpen] = useState(false);

  function addSponsor(newSponsor: Sponsor): void {
    setSponsors([...sponsors, newSponsor]); //simple value
  }

  //<SponsorsSubmission onCreateSponsor={addSponsor} />;

  return (
    <div>
      <nav className="fixed top-0 z-10 w-screen grid grid-cols-2 bg-dark-gray drop-shadow-lg mb-3">
        <div className="flex justify-start items-center mx-8 my-4">
          <a
            className="text-sm font-bold leading-relaxed inline-block  py-2 whitespace-nowrap uppercase text-white"
            href="/"
          >
            <img className="h-10 w-auto object-contain" src={KnightHacksLogo} />
          </a>
        </div>
        <div className="flex flex-grow items-center mx-8 justify-end gap-2">
          <button
            className="py-3 px-8 text-yellow-400 border-2 border-yellow-400 rounded-lg  font-bold transition duration-500 ease-in-out  transform hover:-translate-y-1 hover:scale-110"
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
    </div>
  );
}
