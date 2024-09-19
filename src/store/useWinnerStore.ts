import { create } from "zustand";
import { WinnerProps } from "../interfaces";
import { createWinner, deleteWinner, getWinner, getWinners, updateWinner } from "../services/winner-Service";

interface WinnerState {
    winners: WinnerProps[],
    winnerSet: boolean,
    getWinners: () => Promise<void>,
    getWinner: (id: number) => Promise<WinnerProps | null>,
    createWinner: (winner: WinnerProps) => Promise<void>,
    updateWinner: (winner: WinnerProps) => Promise<void>,
    deleteWinner: (id: number) => Promise<void>,
    resetWinnerSet: () => void
}

export const useWinnerStore = create<WinnerState>((set) => ({
    winners: [],
    winnerSet: false,
    

    getWinners: async () => {
        const winners = await getWinners();
        set({ winners });
    },

    getWinner: async (id: number) => {
        const winner = await getWinner(id);
        return winner;
    },

    createWinner: async (winner: WinnerProps) => {
        const createdWinner = await createWinner(winner);
        set((state) => ({
            ...state,
            winners: [...state.winners, createdWinner],
            winnerSet: true 
        }));
    },

    deleteWinner: async (id: number) => {
        await deleteWinner(id);
        set((state) => ({
            ...state,
            winners: state.winners.filter((w) => w.id !== id),
            winnerSet: true 
        }));
    },

    updateWinner: async (winner: WinnerProps) => {
        const updatedWinner = await updateWinner(winner);
        set((state) => ({
            ...state,
            winners: state.winners.map((w) => (w.id === winner.id ? { ...w, ...updatedWinner } : w)),
            winnerSet: true 
        }));
    },

    resetWinnerSet: () => set({ winnerSet: false })
}));
