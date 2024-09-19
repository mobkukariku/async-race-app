import { FC } from "react";
import { CarProps } from "../interfaces";
import { CarModel } from "./car-model";
import { Button } from "./button";


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
        <div className={`${className} bg-black/40 fixed flex justify-center items-center inset-0 z-50 transition-opacity duration-300 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`bg-slate-300 p-5 w-1/5 gap-2 rounded-lg flex justify-center  flex-col transform transition-transform duration-300 ease-out ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                <div className="flex flex-col gap-3 items-center">
                    <h1 className="font-bold text-2xl text-center">Winner</h1>
                    {car && <CarModel  color={car.color || '#000000'} />}
                    <p>CAR NAME: {car?.name}</p>
                    <p>TIME: {time} s</p>
                </div>
                <Button title="Close" onClick={onClose}  className="w-full" />
            </div>
        </div>
    );
}