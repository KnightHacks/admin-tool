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

function acceptHacker(email: string) {
  const acceptURL = `https://api.knighthacks.org/api/hackers/${email}/accept/`;
  fetch(acceptURL, {
    method: 'PUT',
    credentials: 'include',
  }).catch((err) => {
    throw new Error(err);
  });
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
  const [resume, setResume] = useState('');
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
            {data.first_name} - {data.last_name}
          </h1>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <p>Beginner: {data.beginner ? 'Yes' : 'No'}</p>
            <p>
              Status:
              <span className={`tag is-${colorStatus(status)}`}>{status}</span>
            </p>
          </Typography>
          <div style={{ margin: 10 }}>
            <button
              className="button is-success"
              style={{ marginRight: 5 }}
              onClick={acceptHacker(data.email)}
            >
              Accept
            </button>
            <button className="button is-danger">Decline</button>
          </div>
          <iframe
            src={`https://api.knighthacks.org/api/hackers//${data.email}/resume/`}
          />
          ;
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
