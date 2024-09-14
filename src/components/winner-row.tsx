import { FC } from "react";
import { CarProps, WinnerProps } from "../interfaces";
import { CarModel} from "./";


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
        <div>{winner.time} s</div>
      </div>
    );
  };