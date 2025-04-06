import {
  getMyProfile,
  login,
  loginSocialCallback,
  loginWithFacebook,
  loginWithGoogle,
  logout,
  register,
} from "@/api/authApi";
import { DataLogin, DataRegister, User } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface iAuthStore {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (dataLogin: DataLogin) => Promise<void>;
  logout: () => Promise<void>;
  register: (dataRegister: DataRegister) => Promise<void>;
  getMyProfile: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  loginSocialCallback: (provider: string, code: string) => Promise<void>;
}

export const useAuthStore = create<iAuthStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null,
    
      login: async (dataLogin: DataLogin) => {
        set({ isLoading: true, error: null });
        try {
          const res = await login(dataLogin);
          console.log(res);
          if (res) {
            set({ isAuthenticated: true, error: null });
            console.log("check isAuthenticated", get().isAuthenticated);
            await get().getMyProfile();
            window.location.href = "/";
          } else {
            set({ error: "Invalid credentials." });
          }
        } catch (error) {
          set({ error: "An error occurred during login." });
        } finally {
          set({ isLoading: false });
        }
      },
    
      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await logout();
          set({ isAuthenticated: false, user: null, error: null });
          useAuthStore.persist.clearStorage(); // Clear the storage
          useAuthStore.persist.rehydrate(); // Rehydrate the store
        } catch (error) {
          set({ error: "An error occurred during logout." });
        } finally {
          set({ isLoading: false });
        }
      },
    
      register: async (dataRegister: DataRegister) => {
        set({ isLoading: true, error: null });
        try {
          const res = await register(dataRegister);
          if (res) {
            set({ isAuthenticated: true, error: null });
          } else {
            set({ error: res.message });
          }
        } catch (error) {
          set({ error: "An error occurred during registration." });
        } finally {
          set({ isLoading: false });
        }
      },
    
      getMyProfile: async (): Promise<void> => {
        try {
          const res = await getMyProfile();
          console.log(res);
          if (res) {
            set({ user: res.data, isAuthenticated: true, error: null });
          } else {
            set({ error: res.message, isAuthenticated: false });
          }
        } catch (error) {
          set({ error: "An error occurred while fetching user profile." });
        } finally {
          set({ isLoading: false });
        }
      },
    
      loginWithGoogle: async () => {
        try {
          const res = await loginWithGoogle();
          if (res) {
            window.location.href = res.data;
          }
        } catch (error) {
          set({ error: "An error occurred during login." });
        }
      },
    
      loginWithFacebook: async () => {
        try {
          const res = await loginWithFacebook();
          if (res) {
            window.location.href = res.data;
          }
        } catch (error) {
          set({ error: "An error occurred during login." });
        }
      },
    
      loginSocialCallback: async (provider, code) => {
        try {
          set({ isLoading: true, error: null });
          const res = await loginSocialCallback(provider, code);
          console.log("Login social callback response:", res);
          if (res) {
            set({ isAuthenticated: true, error: null });
            console.log("check isAuthenticated", get().isAuthenticated);
            await get().getMyProfile();
            window.location.href = "/";
          } else {
            set({ error: "Invalid credentials." });
          }
        } catch (error) {
          set({ error: "An error occurred while fetching user profile." });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage", // unique name for the storage (must be unique)
    }
  )
);

