import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
interface Hacker {
  email: string;
  isaccepted: boolean;
  rsvp_status: boolean;
  first_name: string;
  last_name: string;
  beginner: boolean;
}
interface HackerRenderProps {
  data: Hacker;
}

export default function HackerRender({ data }: HackerRenderProps): JSX.Element {
  const [hackerText, setHackerText] = useState('');
  function acceptHacker(data: Hacker, email: string): void {
    if (data.isaccepted === false) {
      const acceptURL = `https://api.knighthacks.org/api/hackers/${email}/accept/`;
      fetch(acceptURL, {
        method: 'PUT',
        credentials: 'include',
      }).catch((err) => {
        throw new Error(err);
      });
      const sendEmailURL = `https://api.knighthacks.org/api/email/verify/${email}/`;
      fetch(sendEmailURL, {
        method: 'POST',
        credentials: 'include',
      }).catch((err) => {
        throw new Error(err);
      });
      setHackerText(
        data.first_name + ' ' + data.last_name + ' has been accepted!',
      );
    } else {
      setHackerText(
        data.first_name + ' ' + data.last_name + ' has already been accepted!',
      );
    }
  }

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
            {/* <p>
              Status:
              <span className={`tag is-${colorStatus(status)}`}>{status}</span>
            </p> */}
          </Typography>
          <div style={{ margin: 10 }}>
            <button
              className="button is-success"
              style={{ marginRight: 5 }}
              onClick={() => acceptHacker(data, data.email)}
            >
              Accept
            </button>
            <button className="button is-danger">Decline</button>
          </div>
          <iframe
            src={`//api.knighthacks.org/api/hackers/${data.email}/resume/`}
          />
          <p>{hackerText}</p>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
