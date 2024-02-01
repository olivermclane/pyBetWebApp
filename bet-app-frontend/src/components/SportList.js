import React, {useState, useEffect} from 'react';
import SportTile from './SportTile';

const SportList = () => {
    const [sports, setSports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/bet/sport');
                const sportsData = await response.json();
                setSports(sportsData);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="sport-tiles-container">
            {error && <p>Error fetching sports: {error.message}</p>}
            {isLoading ? (
                <p>Loading sports...</p>
            ) : sports.length > 0 && (
                <div className="sport-tiles">
                    {sports.map(sport => (
                        <SportTile key={sport.sport_id} sport={sport}/>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SportList;