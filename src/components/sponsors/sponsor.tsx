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
  tier: SponsorTier;
  socials: string[];
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
          className="flex h-1/2 text-white align-center w-36 justify-center text-center rounded-xl py-3 px-4 md:px-8 text-xl font-bold backdrop-opacity-25"
          style={{ color: textColor, backgroundColor: bgColor }}
        >
          {'' + sponsor.tier}
        </div>
      </div>
    );
  }

  return (
    <div className="lg:w-10/12 h-full">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="h-20 px-4 grid grid-cols-2 w-full gap-3 items-center justify-center">
            <div className="flex flex-row items-center">
              <DefaultLogo className="lg:w-16 lg:h-16 w-8 h-8" />
              <text className="flex justify-start text-left py-3 px-4 md:px-8 lg:text-2xl sm:text-lg font-bold">
                {sponsor.name}
              </text>
            </div>
            {showTier()}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          {sponsor.socials.map((linkText) => (
            <Link className="pl-4 py-5" key={linkText} href={linkText}>
              {linkText}
              <br />
            </Link>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
