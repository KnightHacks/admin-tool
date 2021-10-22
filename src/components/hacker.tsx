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

  function showAcceptReject(isaccepted: boolean) {
    if (!isaccepted) {
      return (
        <div className="flex gap-2 mt-4 justify-end items-center">
          <button className="py-3 px-8 bg-blue-400 rounded-lg font-bold">
            {' '}
            Accept{' '}
          </button>
          <button className="py-3 px-8 border-2 text-blue-900 border-blue-900 rounded-lg font-bold">
            {' '}
            Reject{' '}
          </button>
        </div>
      );
    }
  }
  function showStatus(status: boolean, accepted: boolean) {
    if (!accepted) {
      return (
        <div className="w-full flex align-center justify-end md:px-5">
          <div className="flex h-1/2 align-center w-36 justify-center text-center rounded-xl py-3 px-4 md:px-8 font-xs font-bold italic text-red-900 bg-red-300 ">
            Review{' '}
          </div>
        </div>
      );
    }
    if (status) {
      return (
        <div className="w-full flex align-center justify-end md:px-5">
          <div className="flex h-1/2 align-center  w-36 justify-center text-center rounded-xl py-3 px-4 md:px-8 font-xs  italic font-bold text-green-900 bg-green-300 ">
            {' '}
            Confirmed{' '}
          </div>
        </div>
      );
    }
    return (
      <div className="w-full flex align-center justify-end md:px-5">
        <div className="flex h-1/2 align-center  w-36 justify-center text-center rounded-xl py-3 px-4 md:px-8 font-xs  italic font-bold text-yellow-900 bg-yellow-300 backdrop-opacity-25">
          {' '}
          Pending{' '}
        </div>
      </div>
    );
  }
  function showResume(email: string) {
    console.log('show_resume');
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
          <div className="h-24 px-4 grid grid-cols-2 w-full gap-3 items-center justify-center">
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
          <div className="md:grid md:grid-cols-2 flex flex-col px-5 gap-2 md:gap-0 mb-5">
            <div className="grid grid-cols-2 justify-start gap-2">
              <div className="font-bold"> Begineer </div>
              <text> {data.beginner ? 'Yes' : 'No'} </text>

              <div className="font-bold">Email </div>
              <a href="mailto:user@gmail.com"> {data.email} </a>

              <div className="font-bold"> GitHub </div>
              <a href="github.com"> github.com/John-Doe </a>

              <div className="font-bold"> LinkedIn </div>
              <a href="linkedin.com"> linkedin.com/John-Doe </a>
            </div>

            <div className="grid grid-cols-2 justify-start gap-2">
              <div className="font-bold"> More Information </div>
              <text> Info </text>

              <div className="font-bold"> More Information </div>
              <a href="mailto:user@gmail.com"> Info </a>

              <div className="font-bold">More Information </div>
              <a href="github.com"> Info </a>

              <div className="font-bold"> More Information </div>
              <a href="linkedin.com"> Info </a>
            </div>
          </div>
          {/* <iframe
            src={`//api.knighthacks.org/api/hackers/${data.email}/resume/`}
          /> */}
          {showAcceptReject(data.isaccepted)}

          {/* <div style={{ margin: 10 }}>
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
          <p>{hackerText}</p> */}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
