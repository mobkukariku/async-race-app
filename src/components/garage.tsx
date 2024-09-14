import {FC, useEffect, useRef, useState} from 'react';
import { useCarStore } from '../store';
import { ModalUI, GarageControls, TrackLine,  } from "./";
import { Pagination } from './pagination';


type RaceTrackProps = {
    classname?: string
}



export const Garage: FC<RaceTrackProps> = ({classname,}) =>{
    const [isModalVisible, setIsModalVisible] = useState(false);

    const resetFunctions: React.MutableRefObject<(() => void)[]> = useRef([]);

    const{cars, getCars, moveCar} = useCarStore();

    const [currentPage, setCurrentPage] = useState(1);
    const carsPerPage = 5;

    useEffect(()=>{
        getCars();

    }, [getCars]);



    const handleStartRace = async () => {
        cars.forEach((car) => {
            moveCar(car.id, 'started');
        })
    }

    const handleStopRace = () => {
        cars.forEach((car, index) => {
            moveCar(car.id, 'stopped');
           
            if (resetFunctions.current[index]) {
                resetFunctions.current[index]();
            }
        });
    };
    
    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

    const totalPages = Math.ceil(cars.length / carsPerPage);
    
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

   

    return(
        <main className={`${classname} flex mt-40 flex-col gap-4`}>
           <GarageControls 
                onStart={handleStartRace} 
                onStop={handleStopRace} 
                openModal={() => setIsModalVisible(true)} 
            />


            <div className="border-y-4 p-3 flex flex-col gap-3 w-full">
                {currentCars.map((car, index) => (
                    <TrackLine 
                        car={car}
                        key={car.id}
                        registerReset={(resetFn) => { resetFunctions.current[index] = resetFn; }}
                    />
                ))}
            </div>

            {/* Пагинация */}
           {cars.length > 5 && <Pagination currentPage={currentPage} totalPages={totalPages} nextPage={nextPage} prevPage={prevPage} />}

            
            <ModalUI type="create" isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} title="Create New Car" />
        </main>
    )
}