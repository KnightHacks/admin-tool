import React, { useState, useEffect } from 'react';

export default function EventCreation(): JSX.Element {
  const [attendanceCount, setAttendanceCount] = useState('');
  const [description, setDescription] = useState('');
  const [eventStatus, setEventStatus] = useState('');
  const [eventType, setEventType] = useState('');
  const [image, setImage] = useState('');
  const [eventLink, setEventLink] = useState('');
  const [location, setLocation] = useState('');
  const [eventName, setEventName] = useState('');
  const [statusCode, setStatusCode] = useState(0);
  const [statusText, setStatusText] = useState('');
  function AttendanceCapture(event: React.ChangeEvent<HTMLInputElement>) {
    setAttendanceCount(event.target.value);
  }
  function DescriptionCapture(event: React.ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);
  }
  function EventStatusCapture(event: React.ChangeEvent<HTMLInputElement>) {
    setEventStatus(event.target.value);
  }
  function EventTypeCapture(event: React.ChangeEvent<HTMLInputElement>) {
    setEventType(event.target.value);
  }
  function ImageCapture(event: React.ChangeEvent<HTMLInputElement>) {
    setImage(event.target.value);
  }
  function EventLinkCapture(event: React.ChangeEvent<HTMLInputElement>) {
    setEventLink(event.target.value);
  }
  function LocationCapture(event: React.ChangeEvent<HTMLInputElement>) {
    setLocation(event.target.value);
  }
  function EventNameCapture(event: React.ChangeEvent<HTMLInputElement>) {
    setEventName(event.target.value);
  }
  function CreateEvent() {
    const eventData = {
      attendance_count: attendanceCount,
      description: description,
      event_status: eventStatus,
      event_type: eventType,
      image: image,
      link: eventLink,
      loc: location,
      name: eventName,
    };
    const eventCreationURL =
      process.env.REACT_APP_API_URL + 'api/events/create_event/';
    useEffect(() => {
      fetch(eventCreationURL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(eventData),
      })
        .then((response) => setStatusCode(response.status))
        .catch((err) => {
          throw new Error(err);
        });
    }, []);
    if (statusCode === 409) {
      setStatusText(eventName + ' already exist in the database, aborting!');
    } else if (statusCode === 201) {
      setStatusText(eventName + ' has been added successfully!');
    }
  }
  return (
    <div>
      {statusText}
      <label>Attendance Count</label>
      <input type="text" onChange={AttendanceCapture} />
      <label>Date End</label>
      <label>Description</label>
      <input type="text" onChange={DescriptionCapture} />
      <label>Date End</label>
      <label>Event Status</label>
      <input type="text" onChange={EventStatusCapture} />
      <label>Event Type</label>
      <input type="text" onChange={EventTypeCapture} />
      <label>Image</label>
      <input type="text" onChange={ImageCapture} />
      <label>Link</label>
      <input type="text" onChange={EventLinkCapture} />
      <label>Location</label>
      <input type="text" onChange={LocationCapture} />
      <label>Name</label>
      <input type="text" onChange={EventNameCapture} />
      <button onClick={CreateEvent}>Submit</button>
    </div>
  );
}
