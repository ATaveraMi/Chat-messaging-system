import { create } from "zustand";
//create a store with zustand, zustand is a state management library for react that is similar to redux.
//This is useful for managing state in a react application
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data }); //this is to set the authUser state to the response data
    } catch (error) {
      console.log("Error checking auth", error);
      set({ authUser: null }); //this is to set the authUser state to null if there is an error
    } finally {
      set({ isCheckingAuth: false }); //this is to set the isCheckingAuth state to false
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      toast.success("Account created   successfully");
      set({ authUser: response.data });
    } catch (error) {
      console.log("Error signing up", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);
      set({ authUser: response.data });
    } catch (err) {
      console.log("Error logging in", err);
      toast.error(err.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      toast.success("Logged out successfully");
      set({ authUser: null });
    } catch (error) {
      console.log("Error logging out", error);
      toast.error(error.response.data.message);
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axiosInstance.put("auth/update-profile", data);
      set({ authUser: response.data });
      toast.success("Profile updated successfully");
    } catch (e) {
      console.log("Error updating profile", e);
      toast.error(e.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
