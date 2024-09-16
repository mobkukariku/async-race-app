import { WinnerProps } from "../interfaces";
import { axiosInstance } from "./axios-Instance";


export const getWinners = async () => {
    try {
        const response = await axiosInstance.get("/winners");
        return response.data;
    } catch (e) {
        console.error("Error fetching winners:", e);
        return []; 
    }
}


export const getWinner = async (id: number) => {
    try {
        const response = await axiosInstance.get(`/winners/${id}`);
        return response.data;
    } catch (e) {
        console.error(`Error fetching winner with id ${id}:`, e);
        return null; 
    }
}

export const createWinner = async (winner: WinnerProps) => {
    try {
        const response = await axiosInstance.post("/winners", winner);
        return response.data;
    } catch (e) {
        console.error("Error creating winner:", e);
        return null; 
    }
}


export const updateWinner = async (winner: WinnerProps) => {
    try {
        const response = await axiosInstance.put(`/winners/${winner.id}`, winner);
        return response.data;
    } catch (e) {
        console.error(`Error updating winner with id ${winner.id}:`, e);
        return null; 
    }
}
