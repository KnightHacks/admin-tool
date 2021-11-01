import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import Link from '@mui/material/Link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ReactComponent as DefaultLogo } from '../../assets/sponsor-logo-default.svg';

export enum SponsorTier {
  Diamond = 'Diamond',
  Platinum = 'Platinum',
  Gold = 'Gold',
  Silver = 'Silver',
  // Customized Package
  Bronze = 'Bronze',
}

export interface Sponsor {
  name: string;
  website: string;
  description: string;
  tier: SponsorTier;
  logo: File | null;
}

export interface SponsorRenderProps {
  sponsor: Sponsor;
}

export function SponsorRender({ sponsor }: SponsorRenderProps): JSX.Element {
  function showTier() {
    let textColor, bgColor;
    switch (sponsor.tier) {
      case SponsorTier.Bronze:
        bgColor = '#8b6732';
        break;
      case SponsorTier.Silver:
        bgColor = '#6b6b6b';
        break;
      case SponsorTier.Gold:
        bgColor = '#ffc400';
        break;
      case SponsorTier.Platinum:
        bgColor = '#b8b4ae';
        break;
      case SponsorTier.Diamond:
        bgColor = '#76E2FD';
        break;
    }
    return (
      <div className="w-full flex align-center justify-end md:px-5">
        <div
          className="h-1/2 text-white align-center xl:w-36 lg:w-28 w-20 xl:text-xl lg:text-lg text-base justify-center text-center rounded-xl py-3 px-1 lg:px-4 font-bold backdrop-opacity-25"
          style={{ color: textColor, backgroundColor: bgColor }}
        >
          {sponsor.tier}
        </div>
      </div>
    );
  }

  return (
    <div className="w-10/12 h-full">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="mt-0"
        >
          <div className="xl:h-32 h-16 px-4 grid grid-cols-2 w-full gap-3 items-center justify-center">
            <div className="flex flex-row items-center">
              {sponsor.logo ? (
                <img
                  className="xl:h-28 lg:h-16 h-0"
                  src={URL.createObjectURL(sponsor.logo)}
                />
              ) : (
                <DefaultLogo className="xl:h-28 lg:h-16 h-0" />
              )}
              <div className="flex flex-col ml-8">
                <p className="font-bold lg:text-2xl">{sponsor.name}</p>
                <Link
                  href={sponsor.website}
                  className="lg:text-lg text-sm italic"
                >
                  {sponsor.website}
                </Link>
              </div>
            </div>
            {showTier()}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <p className="pl-4 pb-5 lg:text-lg">{sponsor.description}</p>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
