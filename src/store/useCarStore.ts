import { create } from "zustand";
import { CarProps } from "../interfaces";

import { createCar as postCar, getCars as fetchCars, updateCar as patchCar, updateCarEngineStatus } from "../services/car-Service";


interface CarState {
    cars: CarProps[];
    getCars: () => void;
    getCar: (id:number) => void;
    updateCar: (car: CarProps) => void;
    createCar: (car: CarProps) => void;
    moveCar: (id: number, status: 'started' | 'stopped') => void;
}

export const useCarStore = create<CarState>((set) => ({
    cars: [],
    getCars: async () => {
        const cars = await fetchCars();
        set({ cars });
    },
    getCar: async (id:number) => {
        const cars = await fetchCars();
        return cars.find((car: CarProps) => car.id === id);
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
    },
    moveCar: async (id: number, status: 'started' | 'stopped') => {
        const data = await updateCarEngineStatus(id, status);
        set((state) => ({
            cars: state.cars.map((car) => 
                car.id === id ? { ...car, velocity: data.velocity, distance: data.distance } : car
            )
        }));
    }
}))