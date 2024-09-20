export interface CarProps{
    wins: unknown;
    id: number;
    name: string;
    color: string;
    distance: number;  
    velocity: number;  
    status: 'started' | 'stopped' ;
    
}


export interface WinnerProps{
    id: number;
    wins: number;
    time: number;
}