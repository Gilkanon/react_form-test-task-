import { create } from "zustand";

export type UnitType = "EACH" | "SQ-M";

export interface Item {
    id: string;
    name: string;
    unit: UnitType;
    rate: number;
}

interface ItemsState {
    items: Item[];

    addItem: (item: Omit<Item, "id">) => void;
    removeItem: (id: string) => void;
    updateItem: (id: string, data: Partial<Omit<Item, "id">>) => void;
}

export const useItemsStore = create<ItemsState>((set) => ({
    items: [],

    addItem: (newItem) =>
        set((state) => ({
            items: [
                ...state.items,
                {
                    ...newItem,
                    id: crypto.randomUUID(),
                },
            ],
        })),

    removeItem: (id) =>
        set((state) => ({
            items: state.items.filter((item) => item.id !== id),
        })),

    updateItem: (id, data) =>
        set((state) => ({
            items: state.items.map((item) =>
                item.id === id ? { ...item, ...data } : item,
            ),
        })),
}));
