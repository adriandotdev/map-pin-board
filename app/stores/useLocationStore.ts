"use client";
import { create } from "zustand";

type LocationStore = {
	activeLocation: number | null;
	setActiveLocation: (location: number) => void;
};

export const useLocationStore = create<LocationStore>((set) => ({
	activeLocation: null,
	setActiveLocation: (location: number) => {
		set({ activeLocation: location });
	},
}));
