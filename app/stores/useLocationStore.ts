"use client";
import { create } from "zustand";

type LocationStore = {
	isAddingLocation: boolean;
	setAddingLocation: (value: boolean) => void;
	activeLocation: number | null;
	setActiveLocation: (location: number) => void;
};

export const useLocationStore = create<LocationStore>((set) => ({
	activeLocation: null,
	setActiveLocation: (location: number) => {
		set({ activeLocation: location });
	},
	isAddingLocation: false,
	setAddingLocation: (value: boolean) => {
		set({ isAddingLocation: value });
	},
}));
