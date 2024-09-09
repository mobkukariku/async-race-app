import {FC, useEffect, useState} from 'react';
import { useCarStore } from '../store/useCarStore';
import { TrackLine } from './track-line';
import { Car, CirclePlus, Play, RefreshCw } from 'lucide-react';
import { Button } from './button';
import { CreateModalUI } from './create-modal';

type RaceTrackProps = {
    classname?: string
}


export const RaceTrack: FC<RaceTrackProps> = ({classname,}) =>{
    const [isModalVisible, setIsModalVisible] = useState(false);


    const openModal = () => setIsModalVisible(true);

    const closeModal = () => setIsModalVisible(false);

    


    const{cars, getCars,} = useCarStore();
    console.log(cars);

    useEffect(()=>{
        getCars();

    }, [getCars]);


    return(
        <main className={`${classname} flex mt-40 flex-col gap-4`}>
            <div className='flex justify-between'>
                <div className='flex gap-4'>
                    <Button icon={<Play />} title="Start"  />
                    <Button icon={<RefreshCw />} title="Reset"  />
                </div>
                <div className='flex gap-4'>
                    <Button  icon={<CirclePlus />} title="New Car" onClick={() => openModal()}  />
                    <CreateModalUI isVisible={isModalVisible} onClose={closeModal} title="Create New Car" />
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