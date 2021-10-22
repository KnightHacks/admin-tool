import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ReactComponent as DefaultLogo } from '../../assets/sponsor-logo-default.svg';
import './sponsorPage.scss';

export enum SponsorTier {
  Diamond = 4,
  Platinum = 3,
  Gold = 2,
  Silver = 1,
  // Customized Package
  Bronze = 0,
}

export interface Sponsor {
  name: string;
  description: string;
  linkedIn: string;
  tier: SponsorTier;
}

export interface SponsorRenderProps {
  data: Sponsor;
}

export const getSponsorTierString = (tierInt: SponsorTier): string => {
  switch (tierInt) {
    case 0:
      return 'Bronze';
    case 1:
      return 'Silver';
    case 2:
      return 'Gold';
    case 3:
      return 'Platinum';
    case 4:
      return 'Diamond';
    default:
      return 'Invalid Tier';
  }
};

export function SponsorRender({ data }: SponsorRenderProps): JSX.Element {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="sponsorPanel-content"
          id="sponsorPanel-header"
        >
          <DefaultLogo className="sponsorLogo" />
          <h1 style={{ fontWeight: 700 }}>
            {data.name}
            {` (${getSponsorTierString(data.tier)})`}
          </h1>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{data.description}</Typography>
          <Typography>{data.linkedIn}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
