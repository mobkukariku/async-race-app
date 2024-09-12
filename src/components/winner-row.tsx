import { FC } from "react";
import { WinnerProps } from "../types/winner-type";
import { CarProps } from "../types/car-type";
import { CarModel } from "./car-model";


interface WinnerRowProps {
    winner: WinnerProps, 
    car?: CarProps, 
    className: string 
}

export const WinnerRow: FC<WinnerRowProps> = ({ winner, car, className }) => {
    return (
      <div className={`${className}  grid grid-cols-5 gap-4 justify-center items-center`}>
        <div>{winner.id}</div>
        <div>{car?.name}</div>
        <div>
          <CarModel color={car?.color} />
        </div>
        <div>{winner.wins}</div>
        <div>{winner.time}</div>
      </div>
    );
  };