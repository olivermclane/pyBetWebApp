import React, { useState } from 'react';
import '../SportTile.css';
import EventList from './EventList';
import '../App.css';
import '../index.css';

const SportTile = ({ sport }) => {
  const [eventsData, setEventsData] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [error, setError] = useState(null);
  const [isEventsVisible, setIsEventsVisible] = useState(false);

  const handleToggleEvents = async () => {
    setIsLoadingEvents(true);
    setError(null);

    try {
      const response = await fetch(`bet/event?sport_key=${sport.sport_id}`);
      const fetchedEvents = await response.json();
      setEventsData(fetchedEvents);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoadingEvents(false);
      setIsEventsVisible(!isEventsVisible);
    }
  };

  return (
    <div className="sport-tile">
      <h2>{sport.name}</h2>
      <button onClick={handleToggleEvents}>
        {isEventsVisible ? 'Hide Odds' : 'Show Odds'}
      </button>
      {isLoadingEvents && <p>Loading events...</p>}
      {error && <p>Error fetching events: {error.message}</p>}
      {isEventsVisible && <EventList events={eventsData} />}
    </div>
  );
};

export default SportTile;