import React, { useState, useEffect } from 'react';
import { style } from '../../craco.config';
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

  const styles = {
    input:
      'bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full mx-12 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-200',
    label: 'text-gray-500 font-bold w-full md:w-16 px-8',
    field:
      'flex md:flex-row flex-col w-full my-4 mx-8 gap-4 items-center jusitfy-center',
    columns:
      'lg:grid lg:grid-cols-2 flex flex-col items-center jusitfy-center my-4 mx-8 lg:m-0 w-full',
  };
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
  function DescriptionCapture(event: React.ChangeEvent<HTMLTextAreaElement>) {
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
    <div className=" min-h-screen flex items-center justify-center">
      <div className="my-5 mx-5  bg-white  justify-center items-center text-center text-black p-8 gap-2 shadow-md rounded-xl ">
        <text className="text-2xl font-bold"> Create an Event </text>
        {statusText}
        <div className={styles.field}>
          <label className={styles.label}> Event Name</label>
          <input
            type="text"
            className={styles.input}
            onChange={EventNameCapture}
          />
        </div>
        <div className={styles.columns}>
          <div className={styles.field}>
            <label className={styles.label}>Location</label>
            <input
              type="text"
              className={styles.input}
              onChange={LocationCapture}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Attendance Count</label>
            <input
              type="number"
              className={styles.input}
              onChange={AttendanceCapture}
            />
          </div>
        </div>

        <div className={styles.columns}>
          <div className={styles.field}>
            <label className={styles.label}>Start Date</label>
            <input
              type="datetime-local"
              className={styles.input}
              onChange={DateStartCapture}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>End Date</label>
            <input
              type="datetime-local"
              className={styles.input}
              onChange={DateEndCapture}
            />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Description</label>
          <textarea className={styles.input} onChange={DescriptionCapture} />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Event Status</label>
          <input
            type="text"
            className={styles.input}
            onChange={EventStatusCapture}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Event Type</label>
          <input
            type="text"
            className={styles.input}
            onChange={EventTypeCapture}
          />
        </div>

        <div className={styles.columns}>
          <div className={styles.field}>
            <label className={styles.label}>Image</label>
            <input
              type="url"
              className={styles.input}
              onChange={ImageCapture}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Link</label>
            <input
              type="url"
              className={styles.input}
              onChange={EventLinkCapture}
            />
          </div>
        </div>

        <div className="flex mt-8 flex-row gap-8 items-center justify-center">
          <button
            className="p-4 font-bold text-center w-32 rounded-lg bg-yellow-300 text-yellow-800"
            onClick={CreateEvent}
          >
            Submit
          </button>
          <button
            className="p-4 font-bold text-center w-32 rounded-lg bg-purple-300 text-yellow-purple"
            onClick={RefreshClubEvents}
          >
            Refresh
          </button>
        </div>
        <p>{refreshClubStatusText}</p>
      </div>
    </div>
  );
}
