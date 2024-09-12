import {FC, useEffect, useState} from 'react';
import { useCarStore } from '../store/useCarStore';
import { TrackLine } from './track-line';
import { Car, CirclePlus, Play, RefreshCw } from 'lucide-react';
import { Button } from './button';
import { ModalUI } from './modal';

type RaceTrackProps = {
    classname?: string
}



export const Garage: FC<RaceTrackProps> = ({classname,}) =>{
    const [isModalVisible, setIsModalVisible] = useState(false);


    const openModal = () => setIsModalVisible(true);

    const closeModal = () => setIsModalVisible(false);

    


    const{cars, getCars, moveCar} = useCarStore();
    console.log(cars);

    useEffect(()=>{
        getCars();

    }, [getCars]);

    const handleStartRace = async () => {
        cars.forEach((car) => {
            moveCar(car.id, 'started');
        })
    }
    const handleStopRace = async () => {
        cars.forEach((car) => {
            moveCar(car.id, 'stopped');
        })
    }


    return(
        <main className={`${classname} flex mt-40 flex-col gap-4`}>
            <div className='flex justify-between'>
                <div className='flex gap-4'>
                    <Button icon={<Play />} title="Start" onClick={handleStartRace} />
                    <Button icon={<RefreshCw />} title="Reset" onClick={handleStopRace} />
                </div>
                <div className='flex gap-4'>
                    <Button  icon={<CirclePlus />} title="New Car" onClick={() => openModal()}  />
                    <ModalUI type="create" isVisible={isModalVisible} onClose={closeModal} title="Create New Car" />
                    <Button icon={<Car />} title="Generate Cars"   />
                </div>
            </div>

            {/* tracks */}
            <div className='border-y-4 p-3  flex flex-col gap-3 w-full'>
                {cars.map((car)=>(
                    
                    <TrackLine car={car} key={car.id}   />
                ))}
            </div>
        </main>
    )
}