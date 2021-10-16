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

type HackerStatusState = 'Pending' | 'Accepted' | 'Declined';

function hackerState(data: HackerData): HackerStatusState {
  if (data.isAccepted === false && data.rsvpStatus === true) {
    return 'Pending';
  } else if (data.isAccepted === true && data.rsvpStatus === true) {
    return 'Accepted';
  } else {
    return 'Declined';
  }
}

function colorStatus(status: string) {
  switch (status) {
    case 'Pending':
      return 'warning';
    case 'Accepted':
      return 'success';
    case 'Declined':
      return 'danger';
  }
}

export default function HackerRender({ data }: HackerRenderProps): JSX.Element {
  const [status, setStatus] = useState<HackerStatusState>('Pending');

  useEffect(() => {
    const updatedStatus = hackerState(data);
    setStatus(updatedStatus);
  }, []);

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h1 style={{ fontWeight: 700 }}>
            {data.firstName} - {data.lastName}
          </h1>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <p>Beginner: {data.beginner ? 'Yes' : 'No'}</p>
            <p>Pronouns: {data.pronouns}</p>
            <p>
              Status:
              <span className={`tag is-${colorStatus(status)}`}>{status}</span>
            </p>
          </Typography>
          <div style={{ margin: 10 }}>
            <button className="button is-success" style={{ marginRight: 5 }}>
              Accept
            </button>
            <button className="button is-danger">Decline</button>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
