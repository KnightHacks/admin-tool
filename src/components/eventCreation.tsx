import React, { useState, useEffect } from 'react';
import { useEndpoint } from '../api';
export default function EventCreation(): JSX.Element {
  const [attendanceCount, setAttendanceCount] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [description, setDescription] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [eventStatus, setEventStatus] = useState('');
  const [eventType, setEventType] = useState('');
  const [image, setImage] = useState('');
  const [eventLink, setEventLink] = useState('');
  const [location, setLocation] = useState('');
  const [eventName, setEventName] = useState('');
  const [statusCode, setStatusCode] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [refreshClubStatusText, setRefreshClubStatusText] = useState('');
  function RefreshClubEvents() {
    const refreshClubURL =
      process.env.REACT_APP_API_URL + '/api/club/refresh_events/';
    console.log('api url is: ', refreshClubURL);
    const refreshClubEvent = useEndpoint(refreshClubURL);
    console.log('data is: ', refreshClubEvent);
    if (refreshClubEvent.status === 200) {
      setRefreshClubStatusText('Club events have been refreshed!');
    } else if (refreshClubEvent.status === 401) {
      setRefreshClubStatusText('User is not logged in...please log in!');
    }
  }

  function AttendanceCapture(event: React.ChangeEvent<HTMLInputElement>) {
    setAttendanceCount(event.target.value);
  }
  function DateStartCapture(event: React.ChangeEvent<HTMLInputElement>) {
    setDateTime(event.target.value);
  }
  function DescriptionCapture(event: React.ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);
  }
  function DateEndCapture(event: React.ChangeEvent<HTMLInputElement>) {
    setEndDateTime(event.target.value);
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
      date_time: dateTime,
      description: description,
      end_date_time: endDateTime,
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
      <label>Date Start</label>
      <input type="text" onChange={DateStartCapture} />
      <label>Description</label>
      <input type="text" onChange={DescriptionCapture} />
      <label>Date End</label>
      <input type="text" onChange={DateEndCapture} />
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
      <br />
      <button onClick={RefreshClubEvents}>Refresh Club Events</button>
      <p>{refreshClubStatusText}</p>
    </div>
  );
}
