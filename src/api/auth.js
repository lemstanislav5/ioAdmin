import { instance } from "./config.js";

const AuthService = {
    messages () {
        return instance.post("/api/messages", {})
    },
    registration (login, password) {
        return instance.post("/api/registration", {login, password})
    },
    login (login, password) {
        return instance.post("/api/authorization", {login, password})
    },

    logout() {
        return instance.post("/api/logout")
    }
}
export default AuthService;
