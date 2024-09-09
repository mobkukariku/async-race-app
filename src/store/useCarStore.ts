import { create } from "zustand";
import { CarProps } from "../types/car";
import { createCar as postCar, getCars as fetchCars, updateCar as patchCar } from "../services/car-Service";

interface CarState {
    cars: CarProps[];
    getCars: () => void;
    updateCar: (car: CarProps) => void;
    createCar: (car: CarProps) => void;
}

export const useCarStore = create<CarState>((set) => ({
    cars: [],
    getCars: async () => {
        const cars = await fetchCars();
        set({ cars });
    },
    updateCar: async (car: CarProps) => {
        const updatedCar = await patchCar(car);
        set((state) => ({
            cars: state.cars.map((c) => (c.id === car.id ? { ...c, ...updatedCar } : c))
        }));
    },
    createCar: async (car: CarProps) =>{
        const createdCar = await postCar(car);
        set((state) => ({
            cars: [...state.cars, createdCar]
        }));
    }
}));
