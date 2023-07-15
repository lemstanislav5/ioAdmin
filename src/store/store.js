import { makeAutoObservable } from "mobx";
import AuthService from "../api/auth";

class AuthStore {
  isAuth = false;
  isAuthInProgress = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async login(login, password) {
    this.isAuthInProgress = true;
    try {
      const resp = await AuthService.login(login, password);
      console.log(resp)
      localStorage.setItem("token", resp.data.token);
      this.isAuth = true;
      console.log(this.isAuth)
     } catch (err) {
      console.log("login error");
     } finally {
      this.isAuthInProgress = false;
    }
  }

  async checkAuth() {
    this.isAuthInProgress = true;
    try {
      const resp = await AuthService.refreshToken();
      console.log(resp)
      localStorage.setItem("token", resp.data.token);
      this.isAuth = true;

     } catch (err) {
      console.log("login error", err);
     } finally {
      this.isAuthInProgress = false;
    }
  }

  async logout() {
    this.isAuthInProgress = true;
    try {
      await AuthService.logout();
      this.isAuth = false;
      localStorage.removeItem("token");
    } catch (err) {
      console.log("logout error");
    } finally {
      this.isAuthInProgress = false;
    }
  }

}

export default new AuthStore();
