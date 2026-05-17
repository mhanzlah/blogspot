import api from "../api/axios.js";
import { refreshToken } from "../api/auth.api.js";
import { useNavigate } from "react-router-dom";

export const setupInterceptor = (setUser, navigate) => {
    api.interceptors.response.use(
        (res) => res,
        async (error) => {
            const originalRequest = error.config

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true

                try {
                    await refreshToken()

                    return api(originalRequest)
                } catch {
                    setUser(null)
                    navigate('/login')
                }
            }
            return Promise.reject(error)
        }
    )
}
