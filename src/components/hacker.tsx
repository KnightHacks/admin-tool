import { HackerData } from '@knighthacks/hackathon';
import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
interface HackerRenderProps {
  data: HackerData;
}
export default function HackerRender({ data }: HackerRenderProps): JSX.Element {
  function BeginnerStatus(status: boolean | undefined): string {
    if (status === true) return 'Yes';
    else return 'No';
  }
  function ColorStatus(status: string) {
    switch (status) {
      case 'Pending':
        return 'Yellow';
      case 'Accepted':
        return 'Green';
      case 'Declined':
        return 'Red';
    }
  }
  const [status, setStatus] = useState('');
  useEffect(() => {
    if (data.isAccepted === false && data.rsvpStatus === true) {
      setStatus('Pending');
    } else if (data.isAccepted === true && data.rsvpStatus === true) {
      setStatus('Accepted');
    } else if (data.isAccepted === false && data.rsvpStatus === false) {
      setStatus('Declined');
    }
  }, []);

  return (
    <div>
      {/* <p>
        {data.firstName} - {data.lastName}
      </p>
      <button
        style={{ backgroundColor: ColorStatus(status) }}
        onClick={OpenModal(data, handleClose, show)}
      >
        {status}
      </button> */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            {data.firstName} - {data.lastName}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <p>Beginner: {BeginnerStatus(data.beginner)}</p>
            <p>Pronouns: {data.pronouns}</p>
            <p>
              Status:
              <button style={{ backgroundColor: ColorStatus(status) }}>
                {status}
              </button>
            </p>
          </Typography>
          <button style={{ backgroundColor: 'green' }}>Accept</button>
          <button style={{ backgroundColor: 'red' }}>Decline</button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
