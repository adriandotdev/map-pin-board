import { MapPin, Trash2 } from "lucide-react";
import { useLocationStore } from "../stores/useLocationStore";
import { TLocation } from "./MapMarker";

export const Sidebar = ({
	locations,
	handleLocationHover,
	handlePinDeletion,
}: {
	locations: TLocation[];
	handleLocationHover: (index: number) => void;
	handlePinDeletion: (index: number) => void;
}) => {
	const { activeLocation } = useLocationStore();

	return (
		<div
			className={`hidden xl:fixed bottom-0 z-999 left-0 w-full bg-white rounded-t-2xl shadow-lg py-4 h-full xl:h-auto xl:flex xl:flex-col xl:max-w-87.5 xl:top-10 xl:bottom-10 xl:rounded-b-2xl xl:left-10 xl:shadow-2xl ${locations.length > 0 ? "max-h-75" : "max-h-62.5"} xl:max-h-none transition-all`}
		>
			<div className="xl:hidden w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-2"></div>
			<h2 className="text-lg font-bold mx-4 mb-2">Pin Lists</h2>

			<div className="w-full h-[0.5px] bg-gray-200" />

			{locations.length === 0 && (
				<div className="text-center mt-8 flex flex-col justify-center items-center gap-2">
					<MapPin color="gray" />
					<p className="font-bold text-xl text-gray-500">No Result Found</p>
					<p className="text-[14px] font-medium text-gray-500">
						Your map pin list will show in here.
					</p>
				</div>
			)}

			<div className="overflow-y-auto max-h-60 xl:flex-1 xl:max-h-none xl:min-h-0">
				{locations.map((location, index) => (
					<div
						onClick={() => {
							handleLocationHover(index);
						}}
						onMouseOver={() => {
							handleLocationHover(index);
						}}
						onMouseLeave={() => {
							handleLocationHover(-1);
						}}
						key={index}
						className={`flex items-center gap-3 px-4 py-3 border-b border-gray-200 last:border-0 hover:bg-gray-50 hover:cursor-pointer ${index === activeLocation ? "bg-gray-50" : ""}`}
					>
						<div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 text-xs font-bold shrink-0">
							#{index + 1}
						</div>
						<div className="flex-1 min-w-0 flex flex-col gap-1">
							<p className="text-sm font-semibold text-gray-800 max-w-[150ch] text-ellipsis">
								{location.name}
							</p>
							<div className="flex gap-1 items-center">
								<MapPin size={12} color="gray" />
								<p className="text-xs text-gray-400 truncate">
									{location.coordinates[0].toFixed(5)},{" "}
									{location.coordinates[1].toFixed(5)}
								</p>
							</div>
						</div>
						<button
							onClick={() => handlePinDeletion(index)}
							className="p-2 rounded-full text-red-500 hover:bg-red-50 transition-colors shrink-0 border border-gray-300"
						>
							<Trash2 size={16} />
						</button>
					</div>
				))}
			</div>
		</div>
	);
};
