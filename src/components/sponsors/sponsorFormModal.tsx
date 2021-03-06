import React, { useState, useEffect } from 'react';
import { Sponsor, SponsorTier } from './sponsor';
import Typography from '@mui/material/Typography';

interface FormControlProps {
  sponsor?: Sponsor;
  editing?: boolean;
  handleClose: () => void;
  handleSubmission: (newSponsor: Sponsor) => void;
}

export default function SponsorForm({
  handleClose,
  handleSubmission,
}: FormControlProps): JSX.Element {
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [desc, setDesc] = useState('');
  const [tier, setTier] = useState('');
  const [logo, setLogo] = useState<File | null>(null);

  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);

  function validate(): string {
    if (name === '') return 'Name Cannot be Empty';
    if (website === '') return 'Website Cannot be Empty';
    if (tier === '') return 'Must Select a Tier';
    if (!logo) return 'Must Upload an Image';
    return '';
  }

  useEffect(() => {
    setErrorMessage(validate());
  });

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex h-screen pt-4 px-4 pb-20 text-center sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        />

        <div className="m-auto bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex">
              <div className="w-full text-left sm:my-0 sm:mx-4">
                <h1
                  className="text-3xl text-center mb-5 leading-6 font-bold text-gray-900"
                  id="modal-title"
                >
                  New Sponsor
                </h1>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-0"
                    htmlFor="sponsorName"
                  >
                    Name
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

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-0"
                    htmlFor="website"
                  >
                    Website
                  </label>
                  <input
                    className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="website"
                    type="text"
                    value={website}
                    onChange={(event) => {
                      setWebsite(event.target.value);
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
                  <label className="block text-gray-700 block text-sm font-bold mb-2">
                    Tier
                  </label>
                  <select
                    id="sponsorTier"
                    className="form-select w-full block text-gray-700 text-sm mt-1 shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
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
                    <option value="Bronze">Bronze (Custom)</option>
                  </select>
                </div>

                <div className="w-full flex items-center justify-center mb-3 ">
                  <label className="flex items-center h-full px-4 py-2.5 font-medium text-white rounded-lg uppercase border-gray-300 bg-blue-600 hover:bg-blue-700 shadow-small cursor-pointer">
                    <span className="text-sm leading-normal">Upload Logo</span>
                    <input
                      className="hidden"
                      type="file"
                      name="logoUpload"
                      onChange={(event) => {
                        if (event.target.files) setLogo(event.target.files[0]);
                      }}
                    />
                  </label>
                  <Typography className="pl-3">
                    {logo ? logo.name : 'No Image Selected'}
                  </Typography>
                </div>

                {logo && (
                  <img className="mx-auto" src={URL.createObjectURL(logo)} />
                )}

                {errorMessage !== '' && showError && (
                  <p className="text-red-700 text-center">{errorMessage}</p>
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
                    if (errorMsg === '') {
                      handleSubmission({
                        name: name,
                        website: website,
                        description: desc,
                        logo: logo,
                        tier: SponsorTier[tier],
                      });
                    } else {
                      setErrorMessage(errorMsg);
                      setShowError(true);
                    }
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
                    setWebsite('');
                    setDesc('');
                    setTier('');
                    setLogo(null);
                    setShowError(false);
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
