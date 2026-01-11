import { apiClient } from "./httpClient.js";

const AuthService = {
    messages () {
        return apiClient.post("/api/messages", {})
    },
    registration (login, password) {
        return apiClient.post("/api/change-password", {login, password})
    },
    login (login, password) {
        return apiClient.post("/api/login", {login, password})
    },

    logout() {
        return apiClient.post("/api/logout", {})
    }
}
export default AuthService;
