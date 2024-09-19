import { FC, useEffect, useState, useRef, useCallback } from "react";
import { CarProps } from "../interfaces";
import { CarModel, ModalUI, WinnerModal, ControlButtons } from "./";
import {useCarStore, useWinnerStore} from "../store";



interface TrackLineProps {
    className?: string;
    car: CarProps;
    registerReset: (reset: () => void) => void;
}

export const TrackLine: FC<TrackLineProps> = ({ className, car, registerReset}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const openModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);

    const [isWinnerModalVisible, setIsWinnerModalVisible] = useState(false);
    const openWinnerModal = () => setIsWinnerModalVisible(true);
    const closeWinnerModal = () => setIsWinnerModalVisible(false);

    const { moveCar, deleteCar } = useCarStore();
    const { createWinner, winnerSet, getWinner, updateWinner, deleteWinner, resetWinnerSet } = useWinnerStore()
    const trackRef = useRef<HTMLDivElement>(null);
    const [positionX, setPositionX] = useState(0);

    const [winnerTime, setWinnerTime] = useState(0);

    const scaleDistance = useCallback(() => {
        return trackRef.current ? trackRef.current.offsetWidth + 50 : 0; 
    }, [trackRef]);

    const calculateTime = (distance: number, velocity: number) => {
        if (velocity <= 0) {
            return 0;
        }
        return distance / velocity;
    };

    const handleDeleteCar = () => {
        deleteCar(car.id);
        deleteWinner(car.id);
    };


    const resetCarPosition = useCallback(() => {
        setPositionX(0);
        car.velocity=0;
        moveCar(car.id, 'stopped'); 
        resetWinnerSet();
    }, [car, moveCar, resetWinnerSet]);

    useEffect(() => {
        registerReset(resetCarPosition);
    }, [registerReset, resetCarPosition]);



    useEffect(() => {
        console.log(car);
        if (car.velocity > 0 && !winnerSet) {
            const scaledDistance = scaleDistance();
            const time = calculateTime(scaledDistance, car.velocity);


            requestAnimationFrame(() => {
                setPositionX(scaledDistance);
            });

            const timer = setTimeout(async () => {
                try {
                    const winnerData = await getWinner(car.id);
                    moveCar(car.id, 'stopped');

                    if (winnerData) {
                        updateWinner({
                            ...winnerData,
                            wins: winnerData.wins + 1,
                            time: Math.min(winnerData.time, time)
                        });
                    } else {
                        createWinner({ 
                            id: car.id, 
                            wins: 1, 
                            time: Number(time.toFixed(2)) 
                        });
                    }

                    setWinnerTime(Number(time.toFixed(2))); 
                    openWinnerModal();

                } catch (error) {
                    console.error('Error during race: ', error);

                    moveCar(car.id, 'stopped');
                }
            }, time * 1000);

            return () => clearTimeout(timer);
        }
    }, [car.velocity, car.id, moveCar, scaleDistance, createWinner, winnerSet, getWinner, updateWinner, car]);
    

    return (
        <div className={`${className} `} >
            <div className='flex gap-2 items-center'>
                <ControlButtons 
                    onOpenModal={openModal}
                    onReset={resetCarPosition}
                    onMove={() => moveCar(car.id, 'started')}
                    onDelete={handleDeleteCar}
                    
                />
                <CarModel 
                    color={car.color}
                    className="absolute top-0 left-0 h-10 w-10 transition-transform"
                    style={{
                        transform: `translateX(${positionX}px)`,
                        transitionDuration: `${car.velocity > 0 ? calculateTime(scaleDistance(), car.velocity) : 0}s`,
                        transitionTimingFunction: 'ease-in-out' 
                    }}
                />

                <div className=' w-full  h-20 bg-slate-400 flex items-center px-10 text-2xl' ref={trackRef}>
                    <p className="absolute">{car.name}</p>
                </div>
            </div>
            <WinnerModal car={car} time={winnerTime} onClose={closeWinnerModal} isVisible={isWinnerModalVisible} />
            <ModalUI type="update" car={car} isVisible={isModalVisible} onClose={closeModal} title={`Change ${car.name}`} />
        </div>
    );
};
