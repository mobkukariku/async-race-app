import { FC} from "react";
import { Button } from "./button";
import { CarProps } from "../types/car";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCarStore } from "../store/useCarStore";

interface ModalProps{
    className?:string;
    title: string;
    isVisible: boolean;
    onClose: () => void;


}

export const CreateModalUI:FC<ModalProps> = ({className, title, isVisible, onClose, }) =>{
    const {register, handleSubmit} = useForm<CarProps>();
    const createCar = useCarStore((state) => state.createCar);

    if(!isVisible) return null;

    const onSumbit: SubmitHandler<CarProps> = async (data) => {
        try {

            await createCar({...data});
        } catch (error) {
            console.error(error);
        } finally {
            onClose();
        }
    }

    return(
        <div className={`${className} bg-black/40 absolute flex justify-center items-center inset-0 z-30 transition-opacity duration-300 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`bg-slate-300 p-5 w-1/5 rounded-lg transform transition-transform duration-300 ease-out ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                <form className="flex flex-col gap-10" onSubmit={handleSubmit(onSumbit)} >
                    <h1 className="font-bold text-2xl text-center">{title}</h1>
                    <div className="flex justify-center">
                    </div>
                    <div className="flex flex-col">
                        <label className="font-medium">Type Car Brand</label>
                        <input 
                            type="text" 
                            className="p-2 rounded-md"
                            {...register("name")}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-medium">Change Color</label>
                        <input 
                            type="color"
                            {...register("color")}
                        />
                    </div>
                    <Button title="Confirm" />
                </form>
            </div>
        </div>
    )
}