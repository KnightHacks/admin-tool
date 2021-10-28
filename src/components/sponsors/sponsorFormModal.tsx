import React, { useState } from 'react';
import { Sponsor, SponsorTier } from './sponsor';

interface FormControlProps {
  sponsor?: Sponsor;
  editing?: boolean;
  handleClose: () => void;
  handleSubmission: (newSponsor: Sponsor) => void;
}

export default function SponsorForm({
  sponsor = undefined,
  editing = false,
  handleClose,
  handleSubmission,
}: FormControlProps): JSX.Element {
  const [name, setName] = useState(sponsor ? sponsor.name : '');
  const [desc, setDesc] = useState(sponsor ? sponsor.description : '');
  const [linkedIn, setLinkedIn] = useState(sponsor ? sponsor.linkedIn : '');
  const [tier, setTier] = useState(sponsor ? sponsor.tier : '');
  const [errorMessage, setErrorMessage] = useState('');

  function validate(): string {
    if (name === '') return 'Name Cannot be Empty';
    if (tier === '') return 'Must Select a Tier';
    return '';
  }

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        />

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex">
              <div className="w-full text-center sm:my-0 sm:mx-4 sm:text-left">
                <h1
                  className="text-xl mb-5 leading-6 font-bold text-gray-900"
                  id="modal-title"
                >
                  {editing ? 'Editing Sponsor' : 'Creating New Sponsor'}
                </h1>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-0"
                    htmlFor="sponsorName"
                  >
                    Name of Sponsor
                  </label>
                  <input
                    className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="sponsorName"
                    type="text"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                    autoComplete="off"
                  />
                </div>

                <div className="mb-3">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="sponsorDesc"
                  >
                    Description
                  </label>
                  <textarea
                    className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="sponsorDesc"
                    rows={3}
                    value={desc}
                    onChange={(event) => {
                      setDesc(event.target.value);
                    }}
                    autoComplete="off"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-0"
                    htmlFor="sponsorLinkedIn"
                  >
                    Linked In
                  </label>
                  <input
                    className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="sponsorLinkedIn"
                    type="text"
                    value={linkedIn}
                    onChange={(event) => {
                      setLinkedIn(event.target.value);
                    }}
                    autoComplete="off"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Sponsorship Tier
                  </label>
                  <select
                    id="sponsorTier"
                    className="form-select text-gray-700 text-sm block w-full mt-1 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    value={tier}
                    onChange={(event) => {
                      setTier(event.target.value);
                    }}
                  >
                    <option disabled value="">
                      Select a Tier
                    </option>
                    <option value="Diamond">Diamond (Level 4)</option>
                    <option value="Platinum">Platinum (Level 3)</option>
                    <option value="Gold">Gold (Level 2)</option>
                    <option value="Silver">Silver (Level 1)</option>
                    <option value="Bronze">Bronze (Customized Package)</option>
                  </select>
                </div>

                {errorMessage !== '' && (
                  <p className="text-red-700">errorMessage</p>
                )}
              </div>
            </div>

            <div className="flow-root px-4 pb-3 pt-4 sm:px-6">
              <div className="sm:flex sm:flex-row-reverse float-right">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    const errorMsg = validate();
                    if (errorMsg === '')
                      handleSubmission({
                        name: name,
                        description: desc ? desc : 'Description not provided.',
                        linkedIn: linkedIn
                          ? linkedIn
                          : 'LinkedIn not provided.',
                        tier: SponsorTier[tier],
                      });
                    else setErrorMessage(errorMsg);
                  }}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>

              <div className="sm:flex sm:flex-row float-left">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setName('');
                    setDesc('');
                    setLinkedIn('');
                    setTier('');
                  }}
                >
                  Reset Fields
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
