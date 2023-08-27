import { instance } from "./config.js";

const AuthService = {
    checkAccessToken () {
        return instance.post("/api/checkAccessToken")
    },
    registration (login, password) {
        return instance.post("/api/registration", {login, password})
    },
    login (login, password) {
        return instance.post("/api/authorization", {login, password})
    },

    refreshToken() {
        return instance.get("/api/refresh");
    },

    logout() {
        return instance.post("/api/logout")
    }
}
export default AuthService;
