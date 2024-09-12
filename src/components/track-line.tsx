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
}

export const TrackLine: FC<TrackLineProps> = ({ className, car }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [winnerPosted, setWinnerPosted] = useState(false);  

    const openModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);

    const { moveCar } = useCarStore();
    const createWinner = useWinnerStore((state) => state.createWinner);
    const trackRef = useRef<HTMLDivElement>(null);
    const [positionX, setPositionX] = useState(0);

    const scaleDistance = useCallback(() => {
        return trackRef.current ? trackRef.current.offsetWidth + 50 : 0;
    }, [trackRef]);

    const calculateTime = (distance: number, velocity: number) => {
        return distance / velocity;
    };

    useEffect(() => {
        if (car.velocity > 0 && winnerPosted === false) {
            const scaledDistance = scaleDistance();
            const time = calculateTime(scaledDistance, car.velocity);
            setPositionX(scaledDistance);

            const timer = setTimeout(() => {
                moveCar(car.id, 'stopped');
               
                // Проверяем, если победитель еще не был записан
                if (!winnerPosted) {
                    createWinner({ id: car.id, wins: 1, time: time });
                    setWinnerPosted(true);  // Помечаем, что победитель записан
                }

            }, time * 1000);

            return () => clearTimeout(timer);
        }
    }, [car.velocity, car.id, moveCar, scaleDistance, setPositionX, createWinner, winnerPosted]);

    return (
        <div className={`${className} `}>
            <div className='flex gap-2 items-center'>
                <Button icon={<SquarePen />} title="Edit" onClick={() => openModal()} />
                {/* Машина */}
                <CarModel 
                    color={car.color}
                    className="absolute top-0 left-0 h-10 w-10 bg-red-500 transition-transform"
                    style={{
                        transform: `translateX(${positionX}px)`,
                        transitionDuration: `${car.velocity > 0 ? calculateTime(scaleDistance(), car.velocity) : 0}s`
                    }}
                />

                {/* Трек */}
                <div className='w-full h-20 bg-slate-400 flex items-center px-20 text-2xl' ref={trackRef}>
                    {car.name}
                </div>
            </div>

            <ModalUI type="update" car={car} isVisible={isModalVisible} onClose={closeModal} title={`Change ${car.name}`} />
        </div>
    );
};
