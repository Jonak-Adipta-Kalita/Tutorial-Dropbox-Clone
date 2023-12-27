import { create } from "zustand";

interface AppState {
  isModalOpen: "delete" | "rename" | null;
  setIsModalOpen: (modal: "delete" | "rename" | null) => void;

  fileId: string | null;
  setFileId: (fileId: string) => void;

  fileName: string;
  setFileName: (fileName: string) => void;
}

export const useAppStore = create<AppState>()((set) => ({
  fileId: null,
  setFileId: (fileId) => set((state) => ({ fileId })),

  fileName: "",
  setFileName: (fileName) => set((state) => ({ fileName })),

  isModalOpen: null,
  setIsModalOpen: (modal) => set((state) => ({ isModalOpen: modal })),
}));
