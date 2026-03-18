import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix default marker icons broken by bundlers (Vite/Webpack)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

// Helper component to auto-fit the map to show all markers
function FitBounds({ places }) {
    const map = useMap();

    useEffect(() => {
        if (places.length === 0) return;

        const bounds = L.latLngBounds(
            places.map(place => [
                place.location.coordinates[1],
                place.location.coordinates[0]
            ])
        );

        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }, [places, map]);

    return null;
}

export default function MapView({ places = [], center }) {

    const [selected, setSelected] = useState(null);

    return (
        <MapContainer
            center={[center.lat, center.lng]}
            zoom={13}
            style={{ height: "500px", width: "100%", borderRadius: "12px" }}
        >

            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <FitBounds places={places} />

            {places.map(place => (
                <Marker
                    key={place._id}
                    position={[
                        place.location.coordinates[1],
                        place.location.coordinates[0]
                    ]}
                    eventHandlers={{
                        click: () => setSelected(place)
                    }}
                />
            ))}

            {selected && (
                <Popup
                    position={[
                        selected.location.coordinates[1],
                        selected.location.coordinates[0]
                    ]}
                >
                    <div>
                        <h3>{selected.name}</h3>
                        <p>{selected.address}</p>
                    </div>
                </Popup>
            )}

        </MapContainer>
    );
}