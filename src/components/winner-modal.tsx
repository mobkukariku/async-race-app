import { FC } from "react";
import { CarProps, WinnerProps } from "../interfaces";
import { CarModel } from "./car-model";


interface WinnerModalProps {
    className?: string
    car?: CarProps
    isVisible: boolean;
    onClose: () => void;
    time: number;
}


export const WinnerModal:FC<WinnerModalProps> = ({className, car, time , isVisible, onClose}) => {

    if(!isVisible) return null;

    return (
        <div className={`${className} bg-black/40 fixed flex justify-center items-center inset-0 z-30 transition-opacity duration-300 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`bg-slate-300 p-5 w-1/5 rounded-lg transform transition-transform duration-300 ease-out ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                <h1 className="font-bold text-2xl text-center">Winner</h1>
                {car && <CarModel  color={car.color || '#000000'} />}
                <p>{car?.name}</p>
                <p>TIME: {time}</p>

            </div>
        </div>
    );
}