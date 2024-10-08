import { FC, ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    classname?:string
    icon?: ReactNode;
    title?: string;
}

export const Button:FC<ButtonProps> = ({classname, icon, title, ...props}) =>{
    return(
        <button {...props} className={`${classname} max-sm:h-10 max-sm:w-30 max-sm:text-sm max-sm:p-1 max-sm:gap-1   p-2 flex justify-center items-center gap-2 rounded-lg font-bold text-white bg-component-color hover:bg-component-color/85 active:bg-component-color/90 transition-all`}>
            {icon}
            <span className="w-full">{title}</span>
        </button>
    )
}
