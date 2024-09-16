import { FC } from 'react';
import { Play, RefreshCw, CirclePlus, Car } from 'lucide-react';
import { Button } from './';
import { useGenerateCars } from '../hooks';



type GarageControlsProps = {
    onStart: () => void;
    onStop: () => void;
    openModal: () => void;
};

export const GarageControls: FC<GarageControlsProps> = ({ onStart, onStop, openModal }) => {
    const { generateCars } = useGenerateCars();

    const handleGenerateCars = () => {
        const count = 100; 
        generateCars(count);
    };

    return (
        <div className="flex justify-between ">
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
