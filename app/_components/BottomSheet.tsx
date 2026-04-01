import { MapPin, Trash2 } from "lucide-react";
import { animate, motion, useMotionValue } from "motion/react";
import { useRef } from "react";
import { useLocationStore } from "../stores/useLocationStore";
import { TLocation } from "./MapMarker";

export const BottomSheet = ({
	locations,
	handleLocationHover,
	handlePinDeletion,
}: {
	locations: TLocation[];
	handleLocationHover: (index: number) => void;
	handlePinDeletion: (index: number) => void;
}) => {
	const { activeLocation } = useLocationStore();

	const HEADER_HEIGHT = 140;
	const ROW_HEIGHT = 64;
	const getDefaultHeight = () =>
		locations.length === 0
			? 250
			: Math.min(HEADER_HEIGHT + locations.length * ROW_HEIGHT, 340);

	const heightMV = useMotionValue<number | "auto">(getDefaultHeight());
	const startHeightRef = useRef<number>(0);

	const getSnapPoints = () => {
		const vh = window.innerHeight;
		return [getDefaultHeight(), Math.round(vh * 0.5), Math.round(vh * 0.88)];
	};

	const snapToNearest = (h: number) => {
		const points = getSnapPoints();
		return points.reduce((prev, curr) =>
			Math.abs(curr - h) < Math.abs(prev - h) ? curr : prev,
		);
	};

	const onDragStart = () => {
		const el = document.getElementById("bottom-sheet");
		startHeightRef.current =
			el?.getBoundingClientRect().height ?? getDefaultHeight();
		heightMV.set(startHeightRef.current);
	};

	const onDrag = (_: PointerEvent, info: { delta: { y: number } }) => {
		const current = heightMV.get() as number;
		const next = Math.max(
			150,
			Math.min(window.innerHeight * 0.92, current - info.delta.y),
		);
		heightMV.set(next);
	};

	const onDragEnd = () => {
		const snapped = snapToNearest(heightMV.get() as number);
		animate(heightMV, snapped, { type: "spring", stiffness: 400, damping: 40 });
	};

	return (
		<motion.div
			id="bottom-sheet"
			style={{ height: heightMV }}
			className="xl:hidden fixed bottom-0 z-999 left-0 w-full bg-white rounded-t-2xl shadow-lg py-4 overflow-hidden"
		>
			<motion.div
				className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-2 cursor-grab active:cursor-grabbing touch-none"
				drag="y"
				dragConstraints={{ top: 0, bottom: 0 }}
				dragElastic={0}
				dragMomentum={false}
				onDragStart={onDragStart}
				onDrag={onDrag}
				onDragEnd={onDragEnd}
			/>
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

			<div className="overflow-y-auto max-h-60 xl:flex-1  min-h-full pb-10">
				{locations.map((location, index) => (
					<div
						onClick={() => {
							handleLocationHover(index);
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
		</motion.div>
	);
};
