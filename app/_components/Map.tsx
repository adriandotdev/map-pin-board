import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import useGetUserLocation from "../_hooks/useGetUserLocation";
import { useLocationStore } from "../stores/useLocationStore";
import { BottomSheet } from "./BottomSheet";
import { MapMarker, TLocation } from "./MapMarker";
import { Sidebar } from "./Sidebar";
export default function Map() {
	const { setActiveLocation } = useLocationStore();
	const [locations, setLocations] = useState<TLocation[]>([]);
	const { position: userLocation } = useGetUserLocation();

	const handlePinDeletion = (markerIndex: number) => {
		setLocations((prev) =>
			prev.filter((_value, index) => index !== markerIndex),
		);
	};

	const handleLocationHover = (index: number) => {
		setActiveLocation(index);
	};

	if (!userLocation) return null;

	return (
		<div className="relative h-dvh w-full">
			{/* Bottom sheet */}
			<Sidebar
				handleLocationHover={handleLocationHover}
				handlePinDeletion={handlePinDeletion}
				locations={locations}
			/>
			<BottomSheet
				handleLocationHover={handleLocationHover}
				handlePinDeletion={handlePinDeletion}
				locations={locations}
			/>

			<MapContainer
				center={userLocation}
				zoom={13}
				scrollWheelZoom={true}
				className="h-full w-full"
			>
				<TileLayer
					zIndex={-1}
					attribution="&copy; OpenStreetMap contributors"
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={userLocation}>
					<Popup>You are here</Popup>
				</Marker>
				<MapMarker locations={locations} setLocations={setLocations} />
			</MapContainer>
		</div>
	);
}
