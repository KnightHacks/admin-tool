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
  mlh: {
    mlh_send_messages: true;
  };
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

//   const options = {
//     fieldSeparator: ',',
//     quoteStrings: '"',
//     decimalSeparator: '.',
//     showLabels: true,
//     showTitle: true,
//     title: 'Knight Hacks 2021 Attendee Data',
//     useTextFile: false,
//     useBom: true,
//     useKeysAsHeaders: true,
//     filename: 'KH_2021',
//     // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
//   };

//   const csvExporter = new ExportToCsv(options);

  return (
    <div className="h-full w-full mb-12 flex flex-col items-center justify-center gap-3">
      <div className="h-20  w-full flex flex-row-reverse mx-8 items-center justify-start">
<!--         <button
          className="mx-5 bg-transparent hover:bg-yellow-400 text-yellow-400 font-semibold hover:text-white py-2 px-4 border border-yellow-400 hover:border-transparent rounded"
          onClick={() => csvExporter.generateCsv(hackers)}
        > -->
          {' '}
          Export{' '}
        </button>
      </div>
      {hackers.map((hacker) => (
        <HackerRender key={hacker['email']} data={hacker} />
      ))}
    </div>
  );
}
