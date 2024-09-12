export interface CarProps{
    wins: unknown;
    id: number;
    name: string;
    color: string;
    distance: number;  
    velocity: number;  
    status: 'started' | 'stopped';
    
}
