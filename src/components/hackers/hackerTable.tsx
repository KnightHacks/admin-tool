import React, { useState, useEffect } from 'react';
import HackerRender from './hacker';
import { useEndpoint } from '../../api';
import { ExportToCsv } from 'export-to-csv';

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
}
export default function HackerTable(): JSX.Element {
  const [hackers, setHacker] = useState<Array<Hacker>>([]);
  const d = useEndpoint(
    process.env.REACT_APP_API_URL + '/api/hackers/get_all_hackers/',
  );
  useEffect(() => {
    if (d) {
      setHacker(d.hackers ?? []);
    }
  });

  const sampleData1 = {
    email: 'test@knights.ucf.edu',
    isaccepted: false,
    rsvp_status: false,
    first_name: 'John',
    last_name: 'Doe',
    date: '',
    beginner: false,
    edu_info: {
      college: 'COLLEGE',
      graduation_date: 'May 2023',
      level_of_study: 'Undergraduation',
      major: 'COMPUTER SCIENCE',
    },
    socials: {
      github: 'https://github.com/User',
      linkedin: 'https://linkedin.com/User',
    },
    what_learn: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ],
    why_attend: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit pellentesque habitant morbi tristique senectus et. Accumsan sit amet nulla facilisi morbi tempus iaculis. Quisque id diam vel quam elementum pulvinar etiam non quam.',
    ],
    email_verification: false,
  };
  const sampleData2 = {
    email: 'test@knights.ucf.edu',
    isaccepted: true,
    rsvp_status: true,
    first_name: 'John',
    last_name: 'Doe',
    date: '2021-10-14T00:39:57+0000',
    beginner: true,
    edu_info: {
      college: 'COLLEGE',
      graduation_date: 'May 2023',
      level_of_study: 'Undergraduation',
      major: 'COMPUTER SCIENCE',
    },
    socials: {
      github: 'https://github.com/User',
      linkedin: 'https://linkedin.com/User',
    },
    what_learn: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ],
    why_attend: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit pellentesque habitant morbi tristique senectus et. Accumsan sit amet nulla facilisi morbi tempus iaculis. Quisque id diam vel quam elementum pulvinar etiam non quam.',
    ],
    email_verification: false,
  };
  const sampleData3 = {
    email: 'test@knights.ucf.edu',
    isaccepted: true,
    rsvp_status: false,
    first_name: 'John',
    last_name: 'Doe',
    date: '2021-10-14T00:39:57+0000',
    beginner: true,
    edu_info: {
      college: 'COLLEGE',
      graduation_date: 'May 2023',
      level_of_study: 'Undergraduation',
      major: 'COMPUTER SCIENCE',
    },
    socials: {
      github: 'https://github.com/User',
      linkedin: 'https://linkedin.com/User',
    },
    what_learn: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ],
    why_attend: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit pellentesque habitant morbi tristique senectus et. Accumsan sit amet nulla facilisi morbi tempus iaculis. Quisque id diam vel quam elementum pulvinar etiam non quam.',
    ],
    email_verification: false,
  };

  const sampleHackers: Array<Hacker> = [];

  sampleHackers.push(sampleData1);
  for (let i = 0; i < 4; i++) {
    sampleHackers.push(sampleData1);
    sampleHackers.push(sampleData2);
    sampleHackers.push(sampleData3);
  }

  const options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Knight Hacks 2021 Attendee Data',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };

  const csvExporter = new ExportToCsv(options);

  return (
    <div className="h-full w-full mb-12 flex flex-col items-center justify-center gap-3">
      <div className="h-20  w-full flex flex-row-reverse mx-8 items-center justify-start">
        <button
          className="mx-5 bg-transparent hover:bg-yellow-400 text-yellow-400 font-semibold hover:text-white py-2 px-4 border border-yellow-400 hover:border-transparent rounded"
          onClick={() => csvExporter.generateCsv(sampleHackers)}
        >
          {' '}
          Export{' '}
        </button>
      </div>
      {sampleHackers.map((hacker) => (
        <HackerRender key={hacker['email']} data={hacker} />
      ))}
    </div>
  );
}
