import { useEffect, useState } from "react";

export default function useGetUserLocation() {
	const [position, setPosition] = useState<[number, number] | null>(null);

	useEffect(() => {
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
	}, []);

	return { position };
}
