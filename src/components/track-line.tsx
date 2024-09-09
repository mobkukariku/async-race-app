import { FC, useState } from "react";
import { CarProps } from "../types/car";
import { CarModel } from "./car-model";
import { Button } from "./button";
import { SquarePen } from "lucide-react";
import { ChangeModalUI } from "./update-modal";



interface TrackLineProps{
    className?:string;
    car: CarProps;
   
}

export const TrackLine:FC<TrackLineProps> = ({className, car}) =>{
    const [isModalVisible, setIsModalVisible] = useState(false);


    const openModal = () => setIsModalVisible(true);

    const closeModal = () => setIsModalVisible(false);

    return(
        <div className={`${className} `}>
            <div className='flex gap-2 items-center'>
            <Button icon={<SquarePen />} title="Edit" onClick={() => openModal()}/>
            {/* car */}
            <CarModel color={car.color} />

            
            {/* track */}
                <div className='w-full h-20 bg-slate-400 flex items-center px-20 text-2xl'>
                {car.name}
                </div>
            </div>

            <ChangeModalUI car={car}  isVisible={isModalVisible} onClose={()=>closeModal()} title={`Change ${car.name}`}/>
        </div>
    );
}