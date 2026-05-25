import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IFUser } from "@/app/interfaces/user";

type TUserState = {
  user: IFUser | null;
  setUser: (user: IFUser | null) => void;
  updateAvatar: (avatar: string) => void;
  updateName: (name: string) => void;
};

export const useUserStore = create<TUserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      updateAvatar: (avatar) =>
        set((state) =>
          state.user ? { user: { ...state.user, avatar } } : state
        ),
      updateName: (name) =>
        set((state) =>
          state.user ? { user: { ...state.user, name } } : state
        ),
    }),
    {
      name: "user-storage",
    }
  )
);
