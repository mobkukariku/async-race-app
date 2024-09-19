import { useCallback } from 'react';
import { useCarStore } from '../store';
import { CarProps } from '../interfaces';

export function useGenerateCars() {
    const { createCar, cars } = useCarStore();

    const randomColor = useCallback(() => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }, []);

    const randomlyName = useCallback(() => {
        const names = [
            "Toyota", "Ford", "Honda", "Nissan", "Volkswagen", "Chevrolet", "Hyundai", "Kia",
            "Renault", "Peugeot", "BMW", "Mercedes-Benz", "Audi", "Skoda", "Mazda", "Subaru",
            "Mitsubishi", "Suzuki", "Land Rover", "Jaguar", "Volvo", "Porsche", "Ferrari",
            "Lamborghini", "Bentley", "Rolls-Royce", "Aston Martin", "McLaren", "Tesla", "Lexus",
            "Dodge", "Chrysler", "Jeep", "Ram", "Buick", "GMC", "Cadillac", "Lincoln",
            "Infiniti", "Acura", "Genesis", "Alfa Romeo", "Citroen", "Fiat", "MG", "Mini",
            "Smart", "SEAT", "Vauxhall", "Opel", "SAAB", "Maserati", "NIO", "BYD", "Geely",
            "Great Wall", "Changan", "BAIC", "DFM", "JAC", "Haval", "Lynk & Co", "Polestar",
            "SsangYong", "Koenigsegg", "Rimac", "Pagani", "KTM", "Bajaj", "Hero", "TVS",
            "Royal Enfield"
        ];
        return names[Math.floor(Math.random() * names.length)];
    }, []);

    const generateCars = useCallback((count: number) => {
        
        for (let i = cars.length; i < count; i++) {
            const car: CarProps = {
                id: i,
                name: randomlyName(),
                color: randomColor(),
                distance: 0,
                velocity: 0,
                status: 'stopped',
                wins: undefined
            };
            createCar(car);
        }
    }, [cars.length, createCar, randomlyName, randomColor]);

    return { generateCars };
}
