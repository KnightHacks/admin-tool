import React from 'react';
import { Modal } from 'react-bootstrap';
import { HackerData } from '@knighthacks/hackathon';
interface HackerRenderProps {
  data: HackerData;
  handleClose: boolean;
  show: boolean;
}
export default function HackerModal({
  data,
  handleClose,
  show,
}: HackerRenderProps): JSX.Element {
  function BeginnerStatus(status: boolean): string {
    if (status === true) return 'Yes';
    else return 'No';
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          {data.firstName} - {data.lastName}
        </p>
        <p>Beginner {BeginnerStatus(data.beginner)}</p>
        <p>Pronouns {data.pronouns}</p>
        <button>Accept</button>
        <button>Decline</button>
      </Modal.Body>

      <Modal.Footer>
        <button>Close</button>
      </Modal.Footer>
    </Modal>
  );
}
