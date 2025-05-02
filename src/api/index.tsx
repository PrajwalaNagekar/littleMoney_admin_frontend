import axios from 'axios';

const VITE_BACKEND_LOCALHOST_API_URL = import.meta.env.VITE_BACKEND_API_URL;
const api = axios.create({
    baseURL: VITE_BACKEND_LOCALHOST_API_URL,
    headers: {
        "Content-Type": "application/json",
    }
});


export const emailVerify = async (payload) => {
    try {
        const response = await api.post('/email-verification', payload)
        return response.data;
    } catch (error) {
        console.error("Error sending OTP:", error);
        return { success: false, error: error.message };
    }

}

export const verifyOtp = async (payload) => {
    try {
        const response = await api.post('otp-verify', payload);
        return response.data;
    } catch (error) {
        console.error("Error sending OTP:", error);
        return { success: false, error: error.message };
    }
}