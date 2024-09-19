import { FC } from "react";
import { RotatingLines } from "react-loader-spinner";

export const Loading:FC = () =>{

    return (
        <div className="flex justify-center items-center h-36">
            <RotatingLines
                visible={true}
                width="40"
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
             />
        </div>
    )
}