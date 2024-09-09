import { FC } from "react"

interface ContainerProps{
    classname?: string,
    children?: React.ReactNode,
}

export const Container: FC<ContainerProps> = ({classname, children}) =>{
    return(
        <div className={`${classname} container mx-auto px-4 md:px-6 lg:px-8`}>
            {children}
        </div>
    )
}