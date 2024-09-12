import { FC, useEffect, useState } from "react";
import { useCarStore } from "../store/useCarStore";
import { useWinnerStore } from "../store/useWinnerStore";
import { CarModel } from "./car-model";
import { WinnerRow } from "./winner-row";


export const Winners:FC = () =>{
    const {winners, getWinners} = useWinnerStore();
    const {cars, getCars} = useCarStore();
    

    useEffect(() => {
        getCars();
        getWinners();
    }, [getCars, getWinners]);

    return(
        <div className="border-y-4 mt-20  ">
            <div className="grid grid-cols-5 gap-4 font-bold border-b-4 py-2">
                                <div>ID</div>
                                <div>NAME</div>
                                <div>MODEL</div>
                                <div>WINS</div>
                                <div>TIME</div>
            </div>
            {
                winners.map((winner) => {
                    const car = cars.find((car) => car.id === winner.id);
                    return(
                        <div className=" justify-center items-center">
                            <WinnerRow className='py-3' winner={winner} car={car} />
                        </div>
                    )
            })
            }
        </div>
    
    )
}