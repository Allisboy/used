import { defineStore } from "pinia";
import authService from "../auth";
import { Account } from "appwrite";
import db from "../database";
import User from "../collections/User";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    userModel:null,
    isLoading: false,
    error: "",
    success: "",
  }),
  actions: {
    async fetchUser() {
      this.isLoading = true;
      try{
        const user = await authService.getAccount();
      this.isLoading = false;
      if (user) {
        const modelUser=new User()
        this.user = user;
        this.userModel = await modelUser.find(user.$id);

        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
      return user;
      }catch(error){
        throw error
      }
    },
    async refetch () {
      const modelUser=new User()
      this.userModel=await modelUser.find(this.user.$id)
    },
    async login(email, password) {
      this.isLoading = true;
      try {
        const login = await authService.login({ email, password });
        this.user = login;
        this.success = "Logged in successfully!";
        return login;
      } catch (error) {
        this.error = error.message || "Failed to login";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    async signup(email, fullname, password) {
      try {
        const signup = await authService.createAccount({
          email,
          password,
          fullname,
        });
        this.user = signup;
        const userModal = User.init(authService.databases);
        // console.log(signup)
      const userTable=  userModal.create({
          fullname: fullname,
        },signup.userId
    );
        this.success = "Successfully registered!";
        return signup;
      } catch (error) {
        this.user = null;
        this.error = error.message || "Registration Failed!";
        throw error;
      }
    },
    async logout() {
      try {
        await authService.logout();
        this.user = null;
        this.success = "logout successfully";
      } catch (error) {
        this.error = "failed to logout";
      }
    },
  },
  getters: {
    isAuthenticated: (state) => state.user !== null,
    currentUser: (state) => state.user,
  },
});
