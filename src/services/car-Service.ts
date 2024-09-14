
import { CarProps } from "../interfaces";
import { axiosInstance } from "./axios-Instance";

export const getCars = async () =>{
    try{
        const response =  await axiosInstance.get("/garage");
        return response.data;
    }catch(e){
        console.error(e);
    }
}

export const getCar = async (id: number) =>{
    try{
        const response = await axiosInstance.get(`/garage/${id}`);
        return response.data;
    }catch(e){
        console.error(e);
    }
}

export const updateCar = async (car: CarProps) =>{
    try{
        const response =  await axiosInstance.put(`/garage/${car.id}`, car);
        return response.data;
    }catch(e){
        console.error(e);
    }
}

export const createCar = async (car: CarProps) =>{
    try{
        const response = await axiosInstance.post("/garage", car);
        return response.data;
    }catch(e){
        console.error(e);
    }
}
export const updateCarEngineStatus = async (id: number, status: 'started' | 'stopped' ) => {
    try {
        const response = await axiosInstance.patch(`/engine`, null, {
            params: {
                id,
                status
            }
        });
        return response.data;
    } catch (e) {
        console.error(e);
    }
};

