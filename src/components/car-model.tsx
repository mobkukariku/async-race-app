import { FC } from "react";


interface CarModelProps{
    className?:string;
    color?: string;
    style?: React.CSSProperties;
    ref?: React.RefObject<HTMLDivElement>;

}

export const CarModel:FC<CarModelProps> = ({className, color, style, ref,})=>{
    return(
        <div className="relative z-50" style={style} ref={ref} >
            <svg width="157" height="69" viewBox="0 0 157 69" fill={color} xmlns="http://www.w3.org/2000/svg">
                <path d="M17.592 1.07924C1.09822 3.25548 0.0796606 21.9406 0.0245128 23.9797C-0.0306351 26.0188 0.0245128 34.1752 0.0245128 34.1752H156.25V32.2929C155.936 19.5879 152.276 10.0198 150.289 7.66705C148.25 4.05944 141.244 2.02036 138.212 1.5498C125.036 -0.802991 117.037 0.138123 110.919 0.451829L106.371 2.17721H105.273L48.492 2.33406L46.2961 1.07924H17.592Z" />
                <path d="M17.592 66.9761C1.09822 64.7999 0.0796606 46.1147 0.0245128 44.0756C-0.0306351 42.0365 0.0245128 33.8802 0.0245128 33.8802H156.25V35.7624C155.936 48.4675 152.276 58.0355 150.289 60.3883C148.25 63.9959 141.244 66.035 138.212 66.5056C125.036 68.8584 117.037 67.9172 110.919 67.6035L106.371 65.8781H105.273L48.492 65.7213L46.2961 66.9761H17.592Z" />
            </svg>
            <svg className="absolute top-1 left-1" width="136" height="62" viewBox="0 0 136 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M106.581 4.27411C106.544 4.35357 82.5822 7.25431 82.5822 7.25431C87.8261 25.9071 87.0641 36.7597 83.5233 56.3492L106.581 58.8588C132.87 30.8939 106.618 4.19465 106.581 4.27411Z" fill="black" stroke="black"/>
                <path d="M32.0756 2.07816L19.9979 3.9604C52.5142 8.10653 70.1031 7.47061 100.62 2.39187L90.2679 1.76446L78.8177 1.2939H60.1522L32.0756 2.07816Z" fill="black" stroke="black"/>
                <path d="M33.6441 61.8969L21.5665 60.0147C54.0827 55.8686 71.6717 56.5045 102.189 61.5832L91.8365 62.2106L80.3862 62.6812H61.7208L33.6441 61.8969Z" fill="black" stroke="black"/>
                <path d="M30.3502 9.6071H6.97917C-2.00177 28.7668 -1.09798 38.4346 8.07714 54.3101H31.2913C28.3638 36.5663 28.325 26.7972 30.3502 9.6071Z" fill="black" stroke="black"/>
                <path d="M126.511 2.97461C127.734 1.7865 129.689 1.81514 130.877 3.03858L134.354 6.61933C135.129 7.41723 135.111 8.6922 134.313 9.46705C133.275 10.4744 131.618 10.4501 130.611 9.41282L126.479 5.15786C125.885 4.54614 125.899 3.56867 126.511 2.97461Z" fill="#D9D9D9"/>
                <path d="M126.511 60.2737C127.734 61.4618 129.689 61.4331 130.877 60.2097L134.354 56.629C135.129 55.8311 135.111 54.5561 134.313 53.7812C133.275 52.7739 131.618 52.7982 130.611 53.8355L126.479 58.0904C125.885 58.7021 125.899 59.6796 126.511 60.2737Z" fill="#D9D9D9"/>
            </svg>
        </div>
    )
}
