import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
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
  description: string;
  linkedIn: string;
  tier: SponsorTier;
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
          style={{ color: textColor, backgroundColor: bgColor }}
          className="flex font-xs text-white w-44 align-center justify-center text-center rounded-xl px-5 pb-1 font-bold backdrop-opacity-25 mr-5"
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
            <div className="flex flex-row">
              <DefaultLogo className="w-16 h-16" />
              <div className="flex flex-col ml-8">
                <text className="font-bold text-2xl text-left">
                  {sponsor.name}
                </text>
                <text className="text-base italic text-gray-400 text-left">
                  {sponsor.linkedIn}
                </text>
              </div>
            </div>
            {showTier()}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className="text-left text-lg px-5">
            {sponsor.description}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
