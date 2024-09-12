import { WinnerProps } from "../types/winner-type";
import { axiosInstance } from "./axios-Instance";

export const getWinners = async () =>{
    try{
        const response =  await axiosInstance.get("/winners");
        return response.data;
    }catch(e){
        console.error(e);
    }
}

export const getWinner = async (id:number) =>{
    try{
        const response = await axiosInstance.get(`/winners/${id}`);
        return response.data;
    }catch(e){
        console.error(e);
    }
}


export const createWinner = async (winner:WinnerProps) =>{
    try{
        const response =  await axiosInstance.post("/winners", winner);
        return response.data;
    }catch(e){
        console.error(e);
    }
}
