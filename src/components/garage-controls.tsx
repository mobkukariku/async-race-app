import { FC } from 'react';
import { Play, RefreshCw, CirclePlus, Car, OctagonX } from 'lucide-react';
import { Button } from './';
import { useGenerateCars } from '../hooks';



type GarageControlsProps = {
    onStart: () => void;
    onStop: () => void;
    openModal: () => void;
    handleGenerateCars: () => void;
    handleDeleteAllCars: () => void;
};

export const GarageControls: FC<GarageControlsProps> = ({ onStart, onStop, openModal, handleGenerateCars, handleDeleteAllCars }) => {


    return (
        <div className="flex justify-between ">
            <div className="flex gap-4">
                <Button icon={<Play />} title="Start" onClick={onStart} />
                <Button icon={<RefreshCw />} title="Reset" onClick={onStop} />
                <Button icon={<OctagonX />} title="Delete All Cars" onClick={handleDeleteAllCars} />
            </div>
            <div className="flex gap-4">
                <Button icon={<CirclePlus />} title="New Car" onClick={openModal} />
                <Button icon={<Car />} title="Generate Cars" onClick={handleGenerateCars} />
            </div>
        </div>
    );
};
