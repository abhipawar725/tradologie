import api from "./axios";

// export const getMe = () => {
//     return api.get("/api/user/me")
// }

export const loginApi = (data) => {
    return api.post("/login", data, {withCredentials: true})
}

export const logoutApi = () => {
    return api.post("/logout")
}