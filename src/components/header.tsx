import { FC } from "react";
import { Link } from "react-router-dom";

interface HeaderProps{
    classname?: string
}

export const Header: FC<HeaderProps> = ({classname}) =>{
    
    return(
        <header className={`${classname} flex items-baseline gap-6`}>
            <h1 className="text-3xl font-bold">Async Race</h1>
            <nav className="flex flex-col">
                <ul className="flex gap-3 font-medium">
                    <li><Link to="/">Garage</Link></li>
                    <li><Link to="/winners">Winners</Link></li>
                </ul>
            </nav>
        </header>
    )
}