import { DataLogin, DataRegister } from "@/types";
import axiosClient from "@/api/axiosClient";
import Cookies from "js-cookie";

export const login = async (data: DataLogin) => {
    try {
        const res = await axiosClient.post("/auth/login", data);
        console.log("Login response:", res);
        const accessToken = res.data.data.accessToken;
        const refreshToken = res.data.data.refreshToken;
        Cookies.set("access_token", accessToken, { expires: 1, secure: true });
        Cookies.set("refresh_token", refreshToken, { expires: 7, secure: true });
        return res.data;
    } catch (error) {
        console.error("Login error:", error);
        throw new Error("Login failed. Please check your credentials.");
    }
}

export const loginWithGoogle = async () => {
    try {
        const res = await axiosClient.get("/auth/social-login?provider=google");
        return res.data;
    } catch (error) {
        console.error("Login with Google error:", error);
        throw new Error("Login with Google failed. Please check your credentials.");
    }
}

export const loginWithFacebook = async () => {
    try {
        const res = await axiosClient.get("/auth/social-login?provider=facebook");
        return res.data;
    } catch (error) {
        console.error("Login with Facebook error:", error);
        throw new Error("Login with Facebook failed. Please check your credentials.");
    }
}

export const loginSocialCallback = async (provider: String, code: String) => {
    try {
        const res = await axiosClient.get(`/auth/social-login/callback?provider=${provider}&code=${code}`);
        console.log("Login social callback response:", res);
        if (res.data.data === null) {
            throw new Error("Login social callback failed. Please check your credentials.");
        }
        const accessToken = res.data.data.accessToken;
        const refreshToken = res.data.data.refreshToken;
        Cookies.set("access_token", accessToken, { expires: 1, secure: true });
        Cookies.set("refresh_token", refreshToken, { expires: 7, secure: true });
        return res.data;
    } catch (error) {
        console.error("Login social callback error:", error);
        throw new Error("Login social callback failed. Please check your credentials.");
    }
}

export const register = async (data: DataRegister) => {
    try {
        const res = await axiosClient.post("/auth/register", data);
        const accessToken = res.data.data.accessToken;
        const refreshToken = res.data.data.refreshToken;
        Cookies.set("access_token", accessToken, { expires: 1, secure: true });
        Cookies.set("refresh_token", refreshToken, { expires: 7, secure: true });
        return res.data;
    } catch (error) {
        console.error("Register error:", error);
        throw new Error("Registration failed. Please check your information.");
    }
}

export const logout = async () => {
    try {
        const refreshToken = Cookies.get("refresh_token") || null;
        const res = await axiosClient.post("/auth/logout", {
            refreshToken: refreshToken
        });
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        return res.data;
    } catch (error) {
        console.error("Logout error:", error);
        throw new Error("Logout failed. Please try again.");
    }
}

export const getMyProfile = async () => {
    try {
        const res = await axiosClient.get("/auth/me");
        return res.data;
    } catch (error) {
        console.error("Get user info error:", error);
        throw new Error("Failed to fetch user information. Please try again.");
    }
}
