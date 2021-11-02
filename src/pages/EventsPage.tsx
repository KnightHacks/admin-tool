import React from 'react';
import EventCreation from '../components/eventCreation';

export default function EventPage(): JSX.Element {
  return (
    <div className="overflow-y-auto">
      <EventCreation />
    </div>
  );
}
