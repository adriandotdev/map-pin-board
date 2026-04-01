import { MapIcon } from "lucide-react";

export const Header = () => {
	return (
		<div className="bg-white fixed left-0 right-0 p-3 z-99999 flex justify-center gap-1 items-center">
			<MapIcon />
			<p className="font-bold text-center">Map Pinboard</p>
		</div>
	);
};
