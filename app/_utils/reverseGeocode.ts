type TGeoResponse = {
	display_name: string;
	name: string;
};

export const reverseGeocode = async (
	lat: number,
	lon: number,
): Promise<TGeoResponse> => {
	const res = await fetch(
		`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
	);

	const data = await res.json();

	return {
		display_name: data.display_name,
		name: data.name,
	};
};
