import React from 'react';
import EventTile from './EventTile';

const EventList = ({ events }) => {
  return (
    <ul className="event-list">
      {events.map(event => (
        <EventTile key={event.id} event={event} />
      ))}
    </ul>
  );
};

export default EventList;