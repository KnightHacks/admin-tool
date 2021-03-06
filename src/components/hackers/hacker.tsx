import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEndpoint } from '../../api';
interface Hacker {
  email: string;
  isaccepted: boolean;
  rsvp_status: boolean;
  first_name: string;
  last_name: string;
  beginner: boolean;
  date: string;
  edu_info: {
    college: string;
    graduation_date: string;
    level_of_study: string;
    major: string;
  };
  socials: {
    github: string;
    linkedin: string;
  };
  email_verification: boolean;
  what_learn: Array<string>;
  why_attend: Array<string>;
  mlh: {
    mlh_send_messages: true;
  };
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
          <button
            className="py-3 px-8 text-green-900 bg-green-400 rounded-lg font-bold transition duration-500 ease-in-out  transform hover:-translate-y-1 hover:scale-110"
            onClick={() => acceptHacker(data, data.email)}
          >
            {' '}
            Accept{' '}
          </button>
          <button className="py-3 px-8  text-red-800 bg-red-300 rounded-lg font-bold transition duration-500 ease-in-out  transform hover:-translate-y-1 hover:scale-110">
            {' '}
            Reject{' '}
          </button>
        </div>
      );
    }
  }
  function showStatus(verified: boolean, accepted: boolean) {
    if (!accepted) {
      return (
        <div className="w-full flex align-center justify-end md:px-5">
          <div className="flex h-1/2 align-center  w-36 justify-center text-center rounded-xl py-3 px-4 md:px-8 font-xs font-bold text-yellow-900 bg-yellow-300 backdrop-opacity-25">
            {' '}
            Pending{' '}
          </div>
        </div>
      );
    }

    return (
      <div className="w-full flex align-center justify-end md:px-5">
        <div className="flex h-1/2 align-center  w-36 justify-center text-center rounded-xl py-3 px-4 md:px-8 font-xs font-bold text-green-900 bg-green-300 ">
          {' '}
          Confirmed{' '}
        </div>
      </div>
    );
  }
  function verifyEmail(data: Hacker, email: string): void {
    const sendEmailURL = `https://api.knighthacks.org/api/email/verify/${email}/`;
    const opts: RequestInit = {
      method: 'POST',
      credentials: 'include',
    };
    const sentEmail = useEndpoint(sendEmailURL, opts);
    useEffect(() => {
      if (sentEmail) {
        alert('Verified email has been sent!');
      }
    });
  }
  function acceptHacker(data: Hacker, email: string): void {
    if (data.isaccepted === false) {
      const acceptURL = `https://api.knighthacks.org/api/hackers/${email}/accept/`;
      const opts: RequestInit = {
        method: 'PUT',
        credentials: 'include',
      };
      const sentAcceptEmail = useEndpoint(acceptURL, opts);
      useEffect(() => {
        if (sentAcceptEmail) {
          alert('Accepted email has been sent!');
        }
      });
      setHackerText(
        data.first_name + ' ' + data.last_name + ' has been accepted!',
      );
    } else {
      setHackerText(
        data.first_name + ' ' + data.last_name + ' has already been accepted!',
      );
      window.alert(hackerText);
    }
  }

  function daysBetween(date1String: string, date2String: string) {
    const ONE_DAY = 1000 * 60 * 60 * 24;

    const d1 = new Date(date1String);
    const d2 = new Date(date2String);
    const diff_time = d1.getTime() - d2.getTime();
    const diff_days = diff_time / ONE_DAY;

    return Math.floor(diff_days);
  }
  return (
    <div className="md:w-4/6 w-5/6 h-full">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="h-24 px-4 grid grid-cols-2 w-full gap-3 items-center justify-center mx-4">
            <div className="flex flex-col  ">
              <text className="font-bold text-lg lg:text-2xl">
                {' '}
                {data.first_name} {'\t'} {data.last_name}{' '}
              </text>
              <text className="text-medium italic text-gray-400">
                {daysBetween(new Date().toISOString(), data.date)} {'\t'} days
                ago
              </text>
            </div>
            {showStatus(data.email_verification, data.isaccepted)}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="max-h-80 overflow-y-auto">
            <div className="md:grid md:grid-cols-2 flex flex-col px-5 gap-2 md:gap-0 mb-5">
              <div className="grid grid-cols-2 justify-start gap-2 sm:mr-4 px-">
                <div className="font-bold"> Beginner </div>
                <text> {data.beginner ? 'Yes' : 'No'} </text>
                <div className="font-bold sm:">Email </div>
                <a className=" sm:overflow-ellipsis sm:overflow-hidden break-words">
                  {' '}
                  {data.email}{' '}
                </a>
                <div className="font-bold"> GitHub </div>
                <a
                  href={data.socials.github}
                  className=" sm:overflow-ellipsis sm:overflow-hidden break-words "
                >
                  {' '}
                  {data.socials.github ?? 'N/A'}{' '}
                </a>
                <div className="font-bold"> LinkedIn </div>
                <a
                  href={data.socials.linkedin}
                  className=" sm:overflow-ellipsis sm:overflow-hidden break-words"
                >
                  {' '}
                  {data.socials.linkedin ?? 'N/A'}
                </a>
              </div>

              <div className="grid grid-cols-2 justify-start gap-2">
                <div className="font-bold"> College </div>
                <text className=" sm:overflow-ellipsis sm:overflow-hidden break-words">
                  {' '}
                  {data.edu_info.college ?? 'N/A'}{' '}
                </text>

                <div className="font-bold"> Graduation Date</div>
                <a
                  href="mailto:user@gmail.com"
                  className=" sm:overflow-ellipsis sm:overflow-hidden "
                >
                  {' '}
                  {data.edu_info.graduation_date ?? 'N/A'}{' '}
                </a>

                <div className="font-bold">Level of Study </div>
                <text className=" sm:overflow-ellipsis sm:overflow-hidden">
                  {' '}
                  {data.edu_info.level_of_study ?? 'N/A'}{' '}
                </text>

                <div className="font-bold"> Major </div>
                <text className=" sm:overflow-ellipsis sm:overflow-hidden">
                  {' '}
                  {data.edu_info.major ?? 'N/A'}{' '}
                </text>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-2 px-5 mb-12">
              <div className="w-full">
                <div className="font-bold"> What do you want to learn? </div>
                <text> {data.what_learn ?? 'N/A'} </text>
              </div>
              <div className="w-full ">
                <div className="font-bold"> Why do you want to attend? </div>
                <text> {data.why_attend ?? 'N/A'} </text>
              </div>
            </div>
          </div>
          <div className="flex gap-2 justify-end items-center">
            {showAcceptReject(data.isaccepted)}
            <button
              className="py-3 px-8 mt-4  text-blue-500 bg-blue-200 rounded-lg font-bold transition duration-500 ease-in-out  transform hover:-translate-y-1 hover:scale-110"
              onClick={() => verifyEmail(data, data.email)}
            >
              Verify
            </button>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
