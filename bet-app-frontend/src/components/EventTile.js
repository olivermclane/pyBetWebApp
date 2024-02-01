import React, {useEffect} from 'react';
import {Button} from "reactstrap";
import '../App.css';
import '../index.css';

const EventTile = ({event}) => {
    const handleButtonClick = () => {

    };
    return (
        <li className="event-tile">
            <h3>{event.nameA} vs. {event.nameB}</h3>
            <p>{event.date} </p>
            <p>{event.location}</p>
            <Button
                className="rounded-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                value="place" label="Select Odds A" onClick={handleButtonClick}>
                {event.oddsA}
            </Button>
            <Button
                className="rounded-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                value="place" label="Select Odds B" onClick={handleButtonClick}>
                {event.oddsB}
            </Button>
        </li>
    );
};

export default EventTile;