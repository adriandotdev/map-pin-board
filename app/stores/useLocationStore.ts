"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TLocation = {
	name: string;
	coordinates: [number, number];
};

type LocationStore = {
	isAddingLocation: boolean;
	setAddingLocation: (value: boolean) => void;
	activeLocation: number | null;
	setActiveLocation: (location: number) => void;
	locations: TLocation[];
	addLocation: (location: TLocation) => void;
	removeLocation: (index: number) => void;
};

export const useLocationStore = create<LocationStore>()(
	persist(
		(set) => ({
			activeLocation: null,
			setActiveLocation: (location: number) => {
				set({ activeLocation: location });
			},
			isAddingLocation: false,
			setAddingLocation: (value: boolean) => {
				set({ isAddingLocation: value });
			},
			locations: [],
			addLocation: (location: TLocation) => {
				set((state) => ({ locations: [...state.locations, location] }));
			},
			removeLocation: (index: number) => {
				set((state) => ({
					locations: state.locations.filter((_, i) => i !== index),
				}));
			},
		}),
		{
			name: "map-pinboard-locations",
			partialize: (state) => ({ locations: state.locations }),
		},
	),
);
