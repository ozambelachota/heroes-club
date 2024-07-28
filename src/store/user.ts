import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface UserStore {
  user: User;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: {
    id: "",
    name: "",
    email: "",
    avatar: "",
  },
  setUser: (user) => set({ user }),
}));
