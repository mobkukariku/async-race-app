import { create } from "zustand";
import { WinnerProps } from "../types/winner-type";
import { createWinner, getWinners} from "../services/winner-Service";

interface WinnerState {
    winners: WinnerProps[]
    getWinners: () => void,
    getWinner: (id: number) => void,
    createWinner: (winner:WinnerProps) => void
}

export const useWinnerStore = create<WinnerState>((set)=>({
    winners: [],
    getWinners: async () => {
        const winners = await getWinners();
        set({ winners });
    },
    getWinner: async (id: number) => {
        const winners = await getWinners();
        return winners.find((winner: WinnerProps) => winner.id === id);
    },

    createWinner: async (winner:WinnerProps) =>{
        const createdWinner = await createWinner(winner);
        set((state) => ({
            ...state,
            winners: [...state.winners, createdWinner]
            }))
    }
}))