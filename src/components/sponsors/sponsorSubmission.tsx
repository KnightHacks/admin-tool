import React, { useState, useEffect } from 'react';
import { Sponsor } from './sponsor';
import SponsorForm from './sponsorFormModal';

interface SubmissionParams {
  onCreateSponsor: (newSponsor: Sponsor) => void;
}

export default function SponsorsSubmission({
  onCreateSponsor,
}: SubmissionParams): JSX.Element {
  const [formOpen, setFormOpen] = useState(false);
  return (
    <div id="topBar">
      <button
        id="createNewSponsor"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        onClick={() => setFormOpen(true)}
      >
        Add New Sponsor
      </button>
      {formOpen ? (
        <SponsorForm
          handleSubmission={(newSponsorObj) => {
            onCreateSponsor(newSponsorObj);
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
