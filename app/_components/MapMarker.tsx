import L, { LeafletMouseEvent } from "leaflet";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { reverseGeocode } from "../_utils/reverseGeocode";
import { useLocationStore } from "../stores/useLocationStore";

const markerIcon = new L.Icon({
	iconUrl: "/MapPin.svg",
	iconSize: [45, 45],
	iconAnchor: [16, 32],
	popupAnchor: [0, -32],
});

export type TLocation = {
	name: string;
	coordinates: [number, number];
};

export type TMapMarkerProps = {
	locations: TLocation[];
	setLocations: Dispatch<SetStateAction<TLocation[]>>;
};

const handleMapClick = async (
	e: LeafletMouseEvent,
	setLocations: Dispatch<SetStateAction<TLocation[]>>,
	setAddingLocation: (value: boolean) => void,
) => {
	try {
		const { lat, lng } = e.latlng;

		setAddingLocation(true);

		const displayName = await reverseGeocode(lat, lng);

		setLocations((prev) => [
			...prev,
			{
				name:
					displayName.name.length > 0
						? displayName.name
						: displayName.display_name,
				coordinates: [lat, lng],
			},
		]);

		return displayName;
	} finally {
		setAddingLocation(false);
	}
};

export const LocationMarker = ({
	location,
	index,
}: {
	location: TLocation;
	index: number;
}) => {
	const { activeLocation } = useLocationStore();
	const locationMarkerRef = useRef<L.Marker>(null);
	const map = useMap();

	const isDesktop = window.matchMedia("(min-width: 1280px)").matches;

	const flyToWithOffset = (
		map: L.Map,
		lat: number,
		lng: number,
		offsetY: number,
	) => {
		const point = map.project([lat, lng], map.getZoom());

		const newPoint = L.point(point.x, point.y + offsetY);

		const newLatLng = map.unproject(newPoint, map.getZoom());

		map.flyTo(newLatLng, map.getZoom(), {
			animate: true,
			easeLinearity: 3000,
		});
	};

	useEffect(() => {
		if (index === activeLocation) {
			locationMarkerRef.current?.openPopup();

			if (isDesktop) {
				map.flyTo(location.coordinates, map.getZoom(), {
					animate: true,
					easeLinearity: 3000,
				});
			} else {
				flyToWithOffset(
					map,
					location.coordinates[0],
					location.coordinates[1],
					150,
				);
			}
		} else {
			locationMarkerRef.current?.closePopup();
		}
	}, [activeLocation]);

	return (
		<div className="transition-all" key={index}>
			<Marker
				ref={locationMarkerRef}
				position={location.coordinates}
				icon={markerIcon}
			>
				<Popup className="rounded-md">{location.name}</Popup>
			</Marker>
		</div>
	);
};

export const MapMarker = ({ locations, setLocations }: TMapMarkerProps) => {
	const { setActiveLocation, setAddingLocation } = useLocationStore();
	useMapEvents({
		click(e) {
			void handleMapClick(e, setLocations, setAddingLocation);
		},
		dragstart() {
			setActiveLocation(-1);
		},
	});

	return (
		<>
			{locations.map((location, index) => (
				<LocationMarker key={index} location={location} index={index} />
			))}
		</>
	);
};
