import { useEffect, useState } from "react";

export default function useGetUserLocation() {
	const [position, setPosition] = useState<[number, number] | null>(null);

	const requestLocation = () => {
		if (!navigator.geolocation) {
			console.log("Geolocation not supported");
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(pos) => {
				setPosition([pos.coords.latitude, pos.coords.longitude]);
			},
			(err) => {
				console.log(err);
			},
		);
	};

	useEffect(() => {
		requestLocation();
	}, []);

	return { position, requestLocation };
}
