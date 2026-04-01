import L from "leaflet";
import { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";

const customIcon = new L.Icon({
	iconUrl: "/MapPin.svg",
	iconSize: [45, 45],
	iconAnchor: [16, 32],
	popupAnchor: [0, -32],
});

export const MapMarker = () => {
	const [markers, setMarkers] = useState<[number, number][]>([]);

	useMapEvents({
		click(e) {
			const { lat, lng } = e.latlng;

			console.log(markers);
			setMarkers((prev) => [...prev, [lat, lng]]);
		},
	});

	return (
		<>
			{markers.map((position, index) => (
				<Marker key={index} position={position} icon={customIcon}>
					<Popup>Marker {index + 1} 📍</Popup>
				</Marker>
			))}
		</>
	);
};
