import axiosClient from "@/lib/axiosClient";
import { DataLogin, DataRegister } from "@/types/auth.type";
import { User } from "@/types/user.type";
import Cookies from "js-cookie";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useUserStore } from "./user.store";
import { useBookingStore } from "./booking.store";

interface iAuthStore {
  isAuthenticated: boolean;
  // user: User | null;
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
      // user: null,
      isLoading: false,
      error: null,

      login: async (dataLogin: DataLogin) => {
        set({ isLoading: true, error: null });
        try {
          const res = await axiosClient.post("/auth/login", dataLogin);
          if (res.status === 200 && res.data.data) {
            const accessToken = res.data.data.accessToken;
            const refreshToken = res.data.data.refreshToken;
            Cookies.set("access_token", accessToken, {
              expires: 1,
              secure: true,
            });
            Cookies.set("refresh_token", refreshToken, {
              expires: 7,
              secure: true,
            });
            set({ isAuthenticated: true, error: null });
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
          const refreshToken = Cookies.get("refresh_token") || null;
          const res = await axiosClient.post("/auth/logout", {
            refreshToken: refreshToken,
          });
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          set({ isAuthenticated: false, error: null });
          useAuthStore.persist.clearStorage(); // Clear the storage
          useAuthStore.persist.rehydrate(); // Rehydrate the store
          useUserStore.persist.clearStorage(); // Clear user store
          useUserStore.persist.rehydrate(); // Rehydrate user store
          useBookingStore.persist.clearStorage(); // Clear booking store
          useBookingStore.persist.rehydrate(); // Rehydrate booking store
        } catch (error) {
          set({ error: "An error occurred during logout." });
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (dataRegister: DataRegister) => {
        set({ isLoading: true, error: null });
        try {
          const res = await axiosClient.post("/auth/register", dataRegister);
          if (res) {
            const accessToken = res.data.data.accessToken;
            const refreshToken = res.data.data.refreshToken;
            Cookies.set("access_token", accessToken, {
              expires: 1,
              secure: true,
            });
            Cookies.set("refresh_token", refreshToken, {
              expires: 7,
              secure: true,
            });
            set({ isAuthenticated: true, error: null });
          } else {
            set({ error: res });
          }
        } catch (error) {
          set({ error: "An error occurred during registration." });
        } finally {
          set({ isLoading: false });
        }
      },

      getMyProfile: async (): Promise<void> => {
        try {
          const data = await axiosClient.get("/auth/me");
          if (data.status === 200 && data.data) {
            useUserStore.getState().setUser(data.data.data as User);
            set({ isAuthenticated: true, error: null });
          } else {
            set({ error: data.data.message, isAuthenticated: false });
          }
        } catch (error) {
          set({ error: "An error occurred while fetching user profile." });
        } finally {
          set({ isLoading: false });
        }
      },

      loginWithGoogle: async () => {
        try {
          const { data } = await axiosClient.get(
            "/auth/social-login?provider=google"
          );
          if (data) {
            window.location.href = data.data;
          }
        } catch (error) {
          set({ error: "An error occurred during login." });
        }
      },

      loginWithFacebook: async () => {
        try {
          const { data } = await axiosClient.get(
            "/auth/social-login?provider=facebook"
          );
          if (data) {
            window.location.href = data.data;
          }
        } catch (error) {
          set({ error: "An error occurred during login." });
        }
      },

      loginSocialCallback: async (provider, code) => {
        try {
          set({ isLoading: true, error: null });
          const res = await axiosClient.get(
            `/auth/social-login/callback?provider=${provider}&code=${code}`
          );
          console.log("Login social callback response:", res);
          if (res.data.data === null) {
            throw new Error(
              "Login social callback failed. Please check your credentials."
            );
          }
          const accessToken = res.data.data.accessToken;
          const refreshToken = res.data.data.refreshToken;
          Cookies.set("access_token", accessToken, {
            expires: 1,
            secure: true,
          });
          Cookies.set("refresh_token", refreshToken, {
            expires: 7,
            secure: true,
          });
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
