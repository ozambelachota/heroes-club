import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
interface AuthState {
  auth: { id: string; role: string | null };
  setAuth: (authData: { id: string; role: string }) => void;
}

export const useAuthStore = create<AuthState, [["zustand/persist", AuthState]]>(
  persist(
    (set) => ({
      auth: { id: "", role: null },
      setAuth: (authData) => set(() => ({ auth: authData })),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
