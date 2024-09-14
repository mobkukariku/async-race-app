import { FC } from 'react';
import { Play, RefreshCw, CirclePlus, Car } from 'lucide-react';
import { Button } from './';
import { CarProps } from '../interfaces';
import { useCarStore } from '../store';

type GarageControlsProps = {
  onStart: () => void;
  onStop: () => void;
  openModal: () => void;
};

export const GarageControls: FC<GarageControlsProps> = ({ onStart, onStop, openModal }) => {

  const {cars} = useCarStore();
  const randomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const randomlyName = () => {
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
  };

  const handleGenerateCars = () => {
    const count = 100; 
    generateCars(count);
  };

  const generateCars = (count: number) => {
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
      useCarStore.getState().createCar(car);
    }
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-4">
        <Button icon={<Play />} title="Start" onClick={onStart} />
        <Button icon={<RefreshCw />} title="Reset" onClick={onStop} />
      </div>
      <div className="flex gap-4">
        <Button icon={<CirclePlus />} title="New Car" onClick={openModal} />
        <Button icon={<Car />} title="Generate Cars" onClick={handleGenerateCars} />
      </div>
    </div>
  );
};
