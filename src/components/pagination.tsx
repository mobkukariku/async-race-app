import { FC } from "react";
import { Button } from "./button";

interface PaginationProps{
    currentPage: number;
    totalPages: number;
    nextPage: () => void;
    prevPage: () => void;
}

export const Pagination: FC<PaginationProps> = ({currentPage, totalPages, nextPage, prevPage}) => {
    

    return(
        <div className="flex justify-center gap-3 items-center">
                <Button  title='< Prev' onClick={prevPage} disabled={currentPage === 1} />
                <span className="">Page {currentPage} of {totalPages}</span>
                <Button  title="Next >" onClick={nextPage} disabled={currentPage === totalPages} />
        </div>
    )
}