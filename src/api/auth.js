import { instance } from "./config.js";

const AuthService = {
    access (token) {
        return instance.post("/api/access", {token})
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
