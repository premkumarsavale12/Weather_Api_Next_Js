"use client";

import { useState } from "react";
import { Country, State, City } from "country-state-city";
import "./style.css";

export default function Home() {
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [weatherData, setWeatherData] = useState(null);

    const countries = Country.getAllCountries();
    const states = country ? State.getStatesOfCountry(country) : [];
    const cities = state ? City.getCitiesOfState(country, state) : [];

    const fetchWeather = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/weather?city=${city}`);
            const data = await response.json();

            if (response.ok) {
                setWeatherData(data);
            } else {
                setError(data.error || "Failed to fetch weather data.");
            }
        } catch {
            setError("An error occurred while fetching weather data.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (city.trim()) {
            fetchWeather();
        }
    };

    return (
        <div className="container">
            <h1>Weather APP</h1>

            <form onSubmit={handleSearch}>
                {/* Country Dropdown */}
                <select
                    value={country}
                    onChange={(e) => {
                        setCountry(e.target.value);
                        setState("");
                        setCity("");
                    }}
                >
                    <option value="" className="bold">Select Country</option>
                    {countries.map((c) => (
                        <option key={c.isoCode} value={c.isoCode}>
                            {c.name}
                        </option>
                    ))}
                </select>

                {/* State Dropdown */}
                <select
                    value={state}
                    onChange={(e) => {
                        setState(e.target.value);
                        setCity("");
                    }}
                    disabled={!country}
                >
                    <option value="" className="bold"> Select State</option>
                    {states.map((s) => (
                        <option key={s.isoCode} value={s.isoCode}>
                            {s.name}
                        </option>
                    ))}
                </select>

                {/* City Dropdown */}
                <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    disabled={!state}
                >
                    <option value="" className="bold">Select City</option>
                    {cities.map((ct) => (
                        <option key={ct.name} value={ct.name}>
                            {ct.name}
                        </option>
                    ))}
                </select>

                <button className="search" disabled={!city}>
                    Search
                </button>
            </form>

            {loading && <p>Loading weather data...</p>}
            {error && <p className="error">Error: {error}</p>}

            {weatherData && (
                <div className="weather-info">
                    <h2>
                        {weatherData.name}, {weatherData.sys.country}
                    </h2>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Description: {weatherData.weather[0].description}</p>
                    <p>Temperature Minimum: {weatherData.main.temp_min}°C</p>
                    <p>Temperature Maximum: {weatherData.main.temp_max}°C</p>
                </div>
            )}
        </div>
    );
}
