import React, {useEffect, useState} from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home/Home";
import Auth from "./Pages/Auth/Auth";
import Questions from "./Pages/Questions/Questions";
import AskQuestion from "./Pages/AskQuestion/AskQuestion";
import DisplayQuestion from "./Pages/Questions/DisplayQuestion";
import Tags from "./Pages/Tags/Tags";
import Users from "./Pages/Users/Users";
import UserProfile from "./Pages/UserProfile/UserProfile";
import axios from 'axios'; // Import for making API requests

const LocationPage = () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [weather, setWeather] = useState(null); // State for weather data

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                if (navigator.geolocation) {
                    const position = await new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(resolve, reject);
                    });
                    const { coords: { latitude, longitude } } = position;
                    setLocation({ latitude, longitude });

                    // Fetch weather data using the OpenWeatherMap API (replace with your API key)
                    const apiKey = 'a6419eb203c6b77f7618aeafc67c5080'; // Replace with your API key
                    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
                    setWeather(response.data);
                } else {
                    setError('Geolocation is not supported by your browser.');
                }
            } catch (error) {
                console.error('Error fetching location or weather:', error);
                setError('An unexpected error occurred.');
            }
        };

        fetchLocation();
    }, []); // Empty dependency array to run only once on component mount

    const extractCityState = (weatherData) => {
        if (!weatherData) return null;
        const { name, sys: { country } } = weatherData;
        return `${name}, ${country}`;
    };

    return (
        <div>
            <h1>Your Location</h1>
            {error && <p className="error-message">{error}</p>}
            {location && weather && (
                <div>
                    <p>Latitude: {location.latitude}</p>
                    <p>Longitude: {location.longitude}</p>
                    <p>City and State: {extractCityState(weather)}</p>
                    {/* Optionally, display location on a map */}
                    {weather.main && ( // Check for weather data before rendering
                        <p>Current Weather: {weather.main.temp}° (Feels like: {weather.main.feels_like}°)</p>
                    )}
                </div>
            )}
        </div>
    );
};
const AllRoutes = ({ slideIn, handleSlideIn }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />
      <Route path="/Auth" element={<Auth />} />
      <Route path="/AskQuestion" element={<AskQuestion />} />
      <Route
        path="/Questions"
        element={<Questions slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />
      <Route
        path="/Questions/:id"
        element={
          <DisplayQuestion slideIn={slideIn} handleSlideIn={handleSlideIn} />
        }
      />
      <Route
        path="/Tags"
        element={<Tags slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />
      <Route
        path="/Users"
        element={<Users slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />
        <Route
            path="/location" element={<LocationPage slideIn={slideIn} handleSlideIn={handleSlideIn} />} />
      <Route
        path="/Users/:id"
        element={
          <UserProfile slideIn={slideIn} handleSlideIn={handleSlideIn} />
        }
      />
    </Routes>
  );
};



export default AllRoutes;
