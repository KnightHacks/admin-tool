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
  data: Sponsor;
}

export function SponsorRender({ data }: SponsorRenderProps): JSX.Element {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="sponsorPanel-content"
          id="sponsorPanel-header"
        >
          {/*<DefaultLogo className="sponsorLogo" />*/}
          <h1 style={{ fontWeight: 700 }}>{`${data.name} (${data.tier})`}</h1>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{data.description}</Typography>
          <Typography>{data.linkedIn}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
