import { FC, useEffect, useState, useRef, useCallback } from "react";
import { CarProps } from "../types/car-type";
import { CarModel } from "./car-model";
import { Button } from "./button";
import { SquarePen } from "lucide-react";
import { ModalUI } from "./modal";
import { useCarStore } from "../store/useCarStore";
import { useWinnerStore } from "../store/useWinnerStore";


interface TrackLineProps {
    className?: string;
    car: CarProps;
    registerReset: (reset: () => void) => void;
}

export const TrackLine: FC<TrackLineProps> = ({ className, car, registerReset}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const openModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);

    const { moveCar } = useCarStore();
    const { createWinner, winnerSet, getWinner, updateWinner } = useWinnerStore()
    const trackRef = useRef<HTMLDivElement>(null);
    const [positionX, setPositionX] = useState(0);

    const scaleDistance = useCallback(() => {
        return trackRef.current ? trackRef.current.offsetWidth + 50 : 0; 
    }, [trackRef]);

    const calculateTime = (distance: number, velocity: number) => {
        return distance / velocity;
    };

    const resetCarPosition = () => {
        setPositionX(0);
        car.velocity=0;
        moveCar(car.id, 'stopped'); 
    };

    useEffect(() => {
        registerReset(resetCarPosition);
    }, [registerReset]);


    

    useEffect(() => {
        if (car.velocity > 0 && !winnerSet) {
            const scaledDistance = scaleDistance();
            const time = calculateTime(scaledDistance, car.velocity);
    
            requestAnimationFrame(() => {
                setPositionX(scaledDistance);
            });
    
            const timer = setTimeout(async () => {
                moveCar(car.id, 'stopped');
    
            
                const winnerData = await getWinner(car.id);
    
                if (winnerData) {
                    updateWinner({ ...winnerData, wins: winnerData.wins + 1 });
                } else {
                    createWinner({ id: car.id, wins: 1, time: time });
                }
            }, time * 1000);
    
            return () => clearTimeout(timer);
        }
    }, [car.velocity, car.id, moveCar, scaleDistance, createWinner, winnerSet, getWinner, updateWinner]);
    

    return (
        <div className={`${className} `} >
            <div className='flex gap-2 items-center'>
                <Button icon={<SquarePen />} title="Edit" onClick={() => openModal()} />
                <Button  title="A" onClick={() => moveCar(car.id, 'started')} />
                <Button  title="B" onClick={resetCarPosition} />
                <CarModel 
                    color={car.color}
                    className="absolute top-0 left-0 h-10 w-10 transition-transform"
                    style={{
                        transform: `translateX(${positionX}px)`,
                        transitionDuration: `${car.velocity > 0 ? calculateTime(scaleDistance(), car.velocity) : 0}s`,
                        transitionTimingFunction: 'ease-in-out' 
                    }}
                />

                <div className='w-full h-20 bg-slate-400 flex items-center px-20 text-2xl' ref={trackRef}>
                    {car.name}
                </div>
            </div>

            <ModalUI type="update" car={car} isVisible={isModalVisible} onClose={closeModal} title={`Change ${car.name}`} />
        </div>
    );
};
