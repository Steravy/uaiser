import { create } from 'zustand';

interface useUpgradeToProModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;

}

export const useUpgradeToProModal = create<useUpgradeToProModalStore>((set) => ({
    isOpen: true,
    onOpen: () => set(() => ({ isOpen: true })),
    onClose: () => set(() => ({ isOpen: false })),
}));