import React, { useState, useEffect } from "react";
import MoodSelector from "../components/MoodSelector";
import MapView from "../components/MapView";
import api from "../api/axios";

export default function Home() {
    const [selectedMood, setSelectedMood] = useState(null);
    const [places, setPlaces] = useState([]);
    const [coords, setCoords] = useState({ lat: 22.6231, lng: 75.8014 });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setCoords({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            });
        });
    }, []);

    useEffect(() => {
        if (!selectedMood) return;

        api.get(`/api/places?mood=${selectedMood}`)
            .then(res => {
                if (Array.isArray(res.data)) {
                    setPlaces(res.data);
                } else if (res.data.places) {
                    setPlaces(res.data.places);
                } else {
                    setPlaces([]);
                }
            })
            .catch(() => setPlaces([]));
    }, [selectedMood]);

    return (
        <div className="p-8" style={{ paddingTop: "calc(64px + 2rem)" }}>
            <h1 className="text-3xl font-bold mb-2 text-white">Welcome to MoodPlace 🚀</h1>
            <p className="text-purple-300/50 mb-6">
                Find the perfect spot based on how you feel
            </p>

            <MoodSelector
                selected={selectedMood}
                onSelect={setSelectedMood}
            />

            <div className="mt-6">
                <MapView places={places} center={coords} />
            </div>
        </div>
    );
}