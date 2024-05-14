import React, { useState, useEffect } from 'react';

const LocationPage = () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                if (navigator.geolocation) {
                    const position = await new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(resolve, reject);
                    });
                    const { coords: { latitude, longitude } } = position;
                    setLocation({ latitude, longitude });
                } else {
                    setError('Geolocation is not supported by your browser.');
                }
            } catch (error) {
                console.error('Error fetching location:', error);
                setError('An unexpected error occurred.');
            }
        };

        fetchLocation();
    }, []);

    return (
        <div>
            <h1>Your Location</h1>
            {error && <p className="error-message">{error}</p>}
            {location && (
                <div>
                    <p>Latitude: {location.latitude}</p>
                    <p>Longitude: {location.longitude}</p>
                    {/* Optionally, display location on a map */}
                </div>
            )}
        </div>
    );
};

export default LocationPage;
