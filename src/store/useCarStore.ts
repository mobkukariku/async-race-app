import { create } from "zustand";
import { CarProps } from "../interfaces";

import { createCar as postCar, getCars as fetchCars, updateCar as patchCar, updateCarEngineStatus, deleteCar } from "../services/car-Service";

interface CarState {
    cars: CarProps[];
    getCars: () => Promise<void>;
    getCar: (id: number) => Promise<CarProps | null>;
    updateCar: (car: CarProps) => Promise<void>;
    createCar: (car: CarProps) => Promise<void>;
    deleteCar: (id: number) => Promise<void>;
    moveCar: (id: number, status: 'started' | 'stopped') => Promise<void>;
    resetCar: (id: number) => void
}

export const useCarStore = create<CarState>((set) => ({
    cars: [],
    getCars: async () => {
        const cars = await fetchCars();
        set({ cars });
    },
    getCar: async (id: number) => {
        const cars = await fetchCars();
        return cars.find((car: CarProps) => car.id === id);
    },
    updateCar: async (car: CarProps) => {
        const updatedCar = await patchCar(car);
        set((state) => ({
            cars: state.cars.map((c) => (c.id === car.id ? { ...c, ...updatedCar } : c))
        }));
    },
    createCar: async (car: CarProps) => {
        const createdCar = await postCar(car);
        set((state) => ({
            cars: [...state.cars, createdCar] 
        }));
    },
    deleteCar: async (id: number) => {
        await deleteCar(id);
        set((state) => ({
            cars: state.cars.filter((car) => car.id !== id)
        }));
    },
    moveCar: async (id: number, status: 'started' | 'stopped') => {
        const data = await updateCarEngineStatus(id, status);
        set((state) => ({
            cars: state.cars.map((car) =>
                car.id === id ? { ...car, velocity: data.velocity, distance: data.distance } : car
            )
        }));
    },
    resetCar: (id: number) => {
        set((state) => ({
            cars: state.cars.map((car) =>
                car.id === id ? { ...car, velocity: 0, distance: 0 } : car
            )
        }));
    }
}));
