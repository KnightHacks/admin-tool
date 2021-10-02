import { HackerData } from '@knighthacks/hackathon';
import React, { useState, useEffect } from 'react';
import HackerModal from './hackerModal';
interface HackerRenderProps {
  data: HackerData;
}
export default function HackerRender({ data }: HackerRenderProps): JSX.Element {
  function OpenModal(
    { data }: HackerRenderProps,
    handleClose: boolean,
    show: boolean,
  ) {
    setShow(true);
    handleShow();
    <HackerModal data={data} handleClose={handleClose} show={show} />;
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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
      <p>
        {data.firstName} - {data.lastName}
      </p>
      <button
        style={{ backgroundColor: ColorStatus(status) }}
        onClick={OpenModal(data, handleClose, show)}
      >
        {status}
      </button>
    </div>
  );
}
