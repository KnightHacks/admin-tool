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

  function showStatus(status: boolean, accepted: boolean) {
    if (!accepted) {
      return (
        <div className="w-full flex align-center justify-end px-5">
          <div className="flex h-1/2 align-center justify-center text-center rounded-xl py-3 px-8 font-medium italic text-red-900 bg-red-300 ">
            Review{' '}
          </div>
        </div>
      );
    }
    if (status) {
      return (
        <div className="w-full flex align-center justify-end px-5">
          <div className="flex h-1/2 align-center justify-center text-center rounded-xl py-3 px-8 font-medium italic text-green-900 bg-green-300 ">
            {' '}
            Confirmed{' '}
          </div>
        </div>
      );
    }
    return (
      <div className="w-full flex align-center justify-end px-5">
        <div className="flex h-1/2 align-center justify-center text-center rounded-xl py-3 px-8 font-medium italic text-yellow-900 bg-yellow-300 backdrop-opacity-25">
          {' '}
          Pending{' '}
        </div>
      </div>
    );
  }
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
          <div className="h-24 px-4 grid grid-cols-2 w-full items-center justify-center">
            <div className="flex flex-col  ">
              <text className="font-bold text-2xl">
                {' '}
                {data.first_name} {'\t'} {data.last_name}{' '}
              </text>
              <text className="text-medium italic text-gray-400">
                X days ago
              </text>
            </div>
            {showStatus(data.rsvp_status, data.isaccepted)}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <p>Beginner: {data.beginner ? 'Yes' : 'No'}</p>
            <p>Email: {data.email}</p>
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
