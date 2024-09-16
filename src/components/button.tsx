import { FC, ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    classname?:string
    icon?: ReactNode;
    title?: string;
}

export const Button:FC<ButtonProps> = ({classname, icon, title, ...props}) =>{
    return(
        <button {...props} className={`${classname} p-2 flex justify-center items-center gap-2 rounded-lg font-bold text-white bg-component-color hover:bg-component-color/85 active:bg-component-color/90 transition-all`}>
            {icon}
            <span className="w-full">{title}</span>
        </button>
    )
}
