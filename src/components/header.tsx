import { FC } from "react";

interface HeaderProps{
    classname?: string
}

export const Header: FC<HeaderProps> = ({classname}) =>{
    
    return(
        <header className={`${classname} flex items-baseline gap-6`}>
            <h1 className="text-3xl font-bold">Async Race</h1>
            <nav className="flex flex-col">
                <ul className="flex gap-3 font-medium">
                    <li>Garage</li>
                    <li>Winners</li>
                </ul>
            </nav>
        </header>
    )
}