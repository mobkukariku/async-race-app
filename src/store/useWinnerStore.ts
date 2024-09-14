import { create } from "zustand";
import { WinnerProps } from "../types/winner-type";
import { createWinner, getWinner, getWinners, updateWinner } from "../services/winner-Service";

interface WinnerState {
    winners: WinnerProps[],
    winnerSet: boolean,
    winner: WinnerProps | null,
    getWinners: () => Promise<void>,
    getWinner: (id: number) => Promise<WinnerProps | null>,
    createWinner: (winner: WinnerProps) => Promise<void>,
    updateWinner: (winner: WinnerProps) => Promise<void>,
    resetWinnerSet: () => void
}

export const useWinnerStore = create<WinnerState>((set) => ({
    winners: [],
    winnerSet: false,
    winner: null,

    getWinners: async () => {
        const winners = await getWinners();
        set({ winners });
    },

    getWinner: async (id: number) => {
        const winner = await getWinner(id);
        set({ winner });
        return winner; // Возвращаем победителя для дальнейшего использования
    },

    createWinner: async (winner: WinnerProps) => {
        const createdWinner = await createWinner(winner);
        set((state) => ({
            ...state,
            winners: [...state.winners, createdWinner],
            winnerSet: true // Устанавливаем флаг, что победитель создан
        }));
    },

    updateWinner: async (winner: WinnerProps) => {
        const updatedWinner = await updateWinner(winner);
        set((state) => ({
            ...state,
            winners: state.winners.map((w) => (w.id === winner.id ? { ...w, ...updatedWinner } : w)),
            winnerSet: true // Устанавливаем флаг, что победитель обновлен
        }));
    },

    // Метод для сброса флага победителя
    resetWinnerSet: () => set({ winnerSet: false })
}));
