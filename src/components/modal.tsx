import { FC } from "react";
import { CarProps } from "../interfaces";
import { CarModel, Button } from "./";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCarStore } from "../store"

interface ModalProps {
    className?: string;
    car?: CarProps;
    title: string;
    isVisible: boolean;
    onClose: () => void;
    type: "create" | "update";
}

export const ModalUI: FC<ModalProps> = ({ className, title, isVisible, onClose, car, type }) => {
    const { register, handleSubmit } = useForm<CarProps>();
    const updateCar = useCarStore((state) => state.updateCar);
    const createCar = useCarStore((state) => state.createCar);

    if (!isVisible) return null;

    const onSubmit: SubmitHandler<CarProps> = async (data) => {
        try {
            if (type === "create") {
                await createCar({ ...data });
            } else if (type === "update" && car) {
                await updateCar({ ...data, id: car.id });
            }
        } catch (error) {
            console.error(error);
        } finally {
            onClose();
        }
    };

    return (
        <div className={`${className} bg-black/40 fixed flex justify-center items-center inset-0 z-30 transition-opacity duration-300 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`bg-slate-300 p-5 w-1/5 rounded-lg transform transition-transform duration-300 ease-out ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                <form className="flex flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="font-bold text-2xl text-center">{title}</h1>
                    <div className="flex justify-center">
                        {car && <CarModel  color={car.color || '#000000'} />}
                    </div>
                    <div className="flex flex-col">
                        <label className="font-medium">Type Car Brand</label>
                        <input 
                            type="text" 
                            className="p-2 rounded-md"
                            defaultValue={car?.name || ''}
                            {...register("name")}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-medium">Change Color</label>
                        <input 
                            type="color"
                            defaultValue={car?.color || '#000000'}
                            {...register("color")}
                        />
                    </div>
                    <Button title="Confirm" />
                </form>
            </div>
        </div>
    );
};
