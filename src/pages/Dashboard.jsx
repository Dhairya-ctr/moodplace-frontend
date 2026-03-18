import React, { useState, useEffect } from "react";
import MoodSelector from "../components/MoodSelector";
import PlaceCard from "../components/PlaceCard";
import MapView from "../components/MapView";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function Dashboard() {
    const { user } = useAuth();
    const [mood, setMood] = useState(null);
    const [places, setPlaces] = useState([]);
    const [coords, setCoords] = useState({ lat: 22.6231, lng: 75.8014 });

    // get user location
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setCoords({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            });
        });
    }, []);

    // fetch places when mood changes
    useEffect(() => {
        if (!mood) return;

        api.get(`/api/places?mood=${mood}`)
            .then(res => {
                if (Array.isArray(res.data)) {
                    setPlaces(res.data);
                } else if (res.data.places) {
                    setPlaces(res.data.places);
                } else {
                    setPlaces([]);
                }
            })
            .catch(err => {
                console.log(err);
                setPlaces([]);
            });
    }, [mood]);

    const greeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 17) return "Good afternoon";
        return "Good evening";
    };

    const displayName = user?.name || user?.email?.split("@")[0] || "there";

    return (
        <div className="max-w-6xl mx-auto px-4 py-8" style={{ paddingTop: "calc(64px + 2rem)" }}>

            <h1 className="text-3xl font-bold text-center mb-2 text-white">
                {greeting()}, {displayName} 👋
            </h1>

            <p className="text-center text-purple-300/60 mb-6">
                Pick a mood and discover places near you
            </p>

            <MoodSelector selected={mood} onSelect={setMood} />

            <div className="mt-6">
                <MapView places={places} center={coords} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {places.map(place => (
                    <PlaceCard key={place._id} place={place} />
                ))}
            </div>

        </div>
    );
}