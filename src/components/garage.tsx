import { FC, useEffect, useRef, useState } from 'react';
import { useCarStore, useWinnerStore } from '../store';
import { ModalUI, GarageControls, TrackLine } from "./";
import { Pagination } from './pagination';
import { useGenerateCars, usePagination } from '../hooks';
import { Loading } from './loading';

type RaceTrackProps = {
    classname?: string;
};

export const Garage: FC<RaceTrackProps> = ({ classname }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const resetFunctions = useRef<{ [key: number]: () => void }>({});
    const [isLoading, setIsloading] = useState(false);
    const { cars, getCars, moveCar, resetCar, deleteCar } = useCarStore();
    const { generateCars } = useGenerateCars();
    const { resetWinnerSet, deleteWinner, getWinner } = useWinnerStore();
    const { currentPage, totalPages, currentItems, nextPage, prevPage } = usePagination(cars, 5);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                await getCars();
            } catch (error) {
                console.error("Failed to fetch cars:", error);
            }
        };
        fetchCars();
    }, [getCars]);

    const handleStopRace = () => {
        try {
            currentItems.forEach((car) => {
                moveCar(car.id, 'stopped');
                resetFunctions.current[car.id]?.(); 
                resetCar(car.id);
            });
            resetWinnerSet();
        } catch (error) {
            console.error("Error during race stop:", error);
        }
    };

    const handleStartRace = async () => {
        try {
            for (const car of currentItems) {
                await moveCar(car.id, 'started');
            }
        } catch (error) {
            console.error("Error during race start:", error);
        }
    };


    const handleGenerateCars = async () => {
        try {
            setIsloading(true)
            await generateCars();
            await getCars();
            setIsloading(false);

        } catch (error) {
            console.error("Failed to generate cars:", error);
        }
    };
    const handleDeleteAllCars = async () => {
        try {
            cars.forEach(async (car) => {
                deleteCar(car.id);
                if(await getWinner(car.id)){
                    deleteWinner(car.id);
                }
                
            });
            resetWinnerSet();
        } catch (error) {
            console.error("Error during race stop:", error);
        }
    }

    return (
        <main className={`${classname} flex mt-40 flex-col gap-4`}>
            <GarageControls
                onStart={handleStartRace}
                onStop={handleStopRace}
                openModal={() => setIsModalVisible(true)}
                handleGenerateCars={handleGenerateCars}
                handleDeleteAllCars={handleDeleteAllCars}
            />

            <div className="border-y-4 border-component-color p-3 flex flex-col gap-3 w-full">
                {!isLoading ? currentItems.map((car) => (
                    <TrackLine
                        car={car}
                        key={car.id}
                        registerReset={(resetFn) => { resetFunctions.current[car.id] = resetFn; }}
                    />
                )) : <Loading />}

                {cars.length === 0 && (
                    <p className="text-center font-semibold text-3xl p-5 text-red-400">NO CARS IN GARAGE...</p>
                )}
            </div>

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
