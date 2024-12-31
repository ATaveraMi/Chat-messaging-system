import { create } from "zustand";
//create a store with zustand, zustand is a state management library for react that is similar to redux.
//This is useful for managing state in a react application
import { axiosInstance } from "../lib/axios";
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
  signup: async () => {},
  login: async () => {},
  logout: async () => {},
  updateProfile: async () => {},
}));
