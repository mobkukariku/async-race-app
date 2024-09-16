import { FC, useEffect, } from "react";
import { useCarStore } from "../store/useCarStore";
import { useWinnerStore } from "../store/useWinnerStore";
import { WinnerRow } from "./winner-row";
import { Pagination } from "./pagination";
import { usePagination } from "../hooks";


export const Winners:FC = () =>{
    const {winners, getWinners} = useWinnerStore();
    const {cars, getCars} = useCarStore();
   
    
    useEffect(() => {
        getCars();
        getWinners();
    }, [getCars, getWinners]);


    const { currentPage, totalPages, currentItems, nextPage, prevPage } = usePagination(winners, 5);

    return(
        <div>
            <div className="border-y-4 border-component-color mt-32  ">
            <div className="grid grid-cols-5 gap-4 font-bold border-b-4 border-component-color py-2">
                <div>ID</div>
                <div>NAME</div>
                <div>MODEL</div>
                <div>WINS</div>
                <div>TIME</div>
            </div>
            {
                winners && winners.length>0 ? (currentItems.map((winner) => {
                    const car = cars.find((car) => car.id === winner.id);
                    return(
                        <div className=" justify-center items-center">
                            <WinnerRow className='py-3' winner={winner} car={car} />
                        </div>
                    )
            })) : <div className="text-center font-semibold text-3xl p-5 text-red-400">THERE ARE NO CARS HERE...</div>
            }

            </div>
            <div className="my-3">
                { winners.length>5 && <Pagination currentPage={currentPage} totalPages={totalPages} nextPage={nextPage} prevPage={prevPage} />}
            </div>
        </div>
    
    )
}