import { create } from 'zustand';

export const useDialogStore = create((set) => ({
  message: null,
  type: 'error',
  onConfirm: null,
  showDialog: (message, type = 'error', onConfirm = null) =>
    set({ message, type, onConfirm: onConfirm ?? null }),
  close: () => set({ message: null, onConfirm: null })
}));

export const s = useDialogStore;
export default useDialogStore;
