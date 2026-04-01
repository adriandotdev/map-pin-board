import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import useGetUserLocation from "../_hooks/useGetUserLocation";
import { useLocationStore } from "../stores/useLocationStore";
import { BottomSheet } from "./BottomSheet";
import { Header } from "./Header";
import { LoadingIndicator } from "./LoadingIndicator";
import { MapMarker } from "./MapMarker";
import { Sidebar } from "./Sidebar";

export default function Map() {
	const { isAddingLocation } = useLocationStore();
	const { position: userLocation } = useGetUserLocation();

	if (!userLocation)
		return (
			<div className="flex h-dvh w-full flex-col items-center justify-center gap-4 bg-gray-950 text-white">
				<h1 className="text-lg font-bold">
					Please allow this app to access your location
				</h1>
			</div>
		);

	return (
		<div className="relative h-dvh w-full">
			{isAddingLocation && <LoadingIndicator />}

			<Header />

			<Sidebar />
			<BottomSheet />

			<MapContainer
				center={userLocation}
				zoom={13}
				scrollWheelZoom={true}
				zoomControl={false}
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
				<MapMarker />
			</MapContainer>
		</div>
	);
}
