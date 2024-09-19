import { FC, useEffect, useRef, useState } from 'react';
import { useCarStore, useWinnerStore } from '../store';
import { ModalUI, GarageControls, TrackLine } from "./";
import { Pagination } from './pagination';
import { usePagination } from '../hooks';

type RaceTrackProps = {
    classname?: string;
};

export const Garage: FC<RaceTrackProps> = ({ classname }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const resetFunctions = useRef<{ [key: number]: () => void }>({});

    const { cars, getCars, moveCar, resetCar } = useCarStore();
    const {resetWinnerSet} = useWinnerStore();
    const { currentPage, totalPages, currentItems, nextPage, prevPage } = usePagination(cars, 5);

    useEffect(() => {
        getCars();
        
    }, [getCars]);

    const handleStopRace = () => {
        currentItems.forEach((car) => {
            moveCar(car.id, 'stopped');  
            resetFunctions.current[car.id]?.(); 
            resetCar(car.id); 
            resetWinnerSet();
        });
    };

    const handleStartRace = async () => {
        for (const car of currentItems) {
            await moveCar(car.id, 'started'); 
        }
    };

    return (
        <main className={`${classname} flex mt-40 flex-col gap-4`}>
            <GarageControls 
                onStart={handleStartRace} 
                onStop={handleStopRace} 
                openModal={() => setIsModalVisible(true)} 
            />

            <div className="border-y-4 border-component-color p-3 flex flex-col gap-3 w-full">
                {currentItems.map((car) => (
                    <TrackLine 
                        car={car}
                        key={car.id}
                        registerReset={(resetFn) => { resetFunctions.current[car.id] = resetFn; }}
                    />
                ))}
            </div>

            {/* Пагинация */}
            {cars.length > 5 && (
                <Pagination 
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    nextPage={nextPage} 
                    prevPage={prevPage} 
                />
            )}

            <ModalUI 
                type="create" 
                isVisible={isModalVisible} 
                onClose={() => setIsModalVisible(false)} 
                title="Create New Car" 
            />
        </main>
    );
};
