import { create } from 'zustand';

export const useToastStore = create((set) => ({
  message: null,
  notifyComingSoon: (featureName) =>
    set({ message: `${featureName} sẽ có ở giai đoạn triển khai tiếp theo.` }),
  notifyError: (msg) => set({ message: msg }),
  dismiss: () => set({ message: null })
}));

export const useSandboxStore = create((set, get) => ({
  isSandboxMode: false,
  snapshot: null,
  enter: (snapshot) => {
    document.body.classList.add('sandbox-mode');
    set({ isSandboxMode: true, snapshot });
  },
  exit: () => {
    const prevSnapshot = get().snapshot;
    document.body.classList.remove('sandbox-mode');
    set({ isSandboxMode: false, snapshot: null });
    return prevSnapshot;
  }
}));

export default { useToastStore, useSandboxStore };
