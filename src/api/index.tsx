import axios from 'axios';

const VITE_BACKEND_LOCALHOST_API_URL = import.meta.env.VITE_BACKEND_API_URL;
const api = axios.create({
    baseURL: VITE_BACKEND_LOCALHOST_API_URL,
    headers: {
        "Content-Type": "application/json",
    }
});


export const emailVerify = async (payload: any) => {
    try {
        const response = await api.post('/email-verification', payload)
        return response.data;
    } catch (error) {
        console.error("Error sending OTP:", error);
        return { success: false, error:error instanceof Error ? error.message : "An unknown error occurred", };
    }

}

export const verifyOtp = async (payload: any) => {
    try {
        const response = await api.post('/otp-verification', payload);
        return response.data;
    } catch (error) {
        console.error("Error sending OTP:", error);
        return { success: false, error:error instanceof Error ? error.message : "An unknown error occurred",};
    }
}

export const getAllDetails = async () => {
    try {
        const response = await api.get('/all-details');
        return response.data; // Return the actual data to the caller
    } catch (error) {
        console.error("Error fetching all details:", error);
        throw error; // Re-throw so the calling component can handle it
    }
}
// export const getAllOffers = async () => {
//     try {
//         const response = await api.get('/all-offers');
//         return response.data; // Return the actual data to the caller
//     } catch (error) {
//         console.error("Error fetching all details:", error);
//         throw error; // Re-throw so the calling component can handle it
//     }
// }