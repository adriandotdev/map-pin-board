import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { MapMarker } from "./_components/MapMarker";
import useGetUserLocation from "./_hooks/useGetUserLocation";

export default function Map() {
	const { position: userLocation } = useGetUserLocation();

	if (!userLocation) return null;

	return (
		<MapContainer
			center={userLocation}
			zoom={13}
			scrollWheelZoom={true}
			style={{ height: "100dvh", width: "100%" }}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>

			<Marker position={userLocation}>
				<Popup>You are here</Popup>
			</Marker>
			<MapMarker />
		</MapContainer>
	);
}
