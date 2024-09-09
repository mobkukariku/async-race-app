import { FC, ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    classname?:string
    icon?: ReactNode;
    title?: string;
}

export const Button:FC<ButtonProps> = ({classname, icon, title, ...props}) =>{
    return(
        <button {...props} className={`${classname} p-2 flex justify-center items-center gap-2 rounded-lg font-bold text-white bg-slate-600 hover:bg-slate-700 active:bg-slate-800 transition-all`}>
            {icon}
            <span className="w-full">{title}</span>
        </button>
    )
}
