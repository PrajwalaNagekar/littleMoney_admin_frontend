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
        return { success: false, error: error instanceof Error ? error.message : "An unknown error occurred", };
    }

}

export const verifyOtp = async (payload: any) => {
    try {
        const response = await api.post('/otp-verification', payload);
        return response.data;
    } catch (error) {
        console.error("Error sending OTP:", error);
        return { success: false, error: error instanceof Error ? error.message : "An unknown error occurred", };
    }
}

export const getAllDetails = async (search = '') => {
    try {
        const response = await api.get(`/all-details?search=${encodeURIComponent(search)}`);
        return response.data; // Return the actual data to the caller
    } catch (error) {
        console.error("Error fetching all details:", error);
        throw error; // Re-throw so the calling component can handle it
    }
};
export const getAllOffers = async (leadId: string) => {
    try {
        const response = await api.get(`/all-offers/${leadId}`);
        return response.data; // Return the actual data to the caller
    } catch (error) {
        console.error("Error fetching all details:", error);
        throw error; // Re-throw so the calling component can handle it
    }
}

export const getSummary = async (leadId: string) => {
    try {
        const response = await api.get(`/get-summary/${leadId}`)
        return response
    } catch (error) {
        console.error("Error fetching summary:", error);
        throw error; // Re-throw so the calling component can handle it
    }
}

export const fetchFilteredLoanData = async (from: any, to: any, type: any = 'created') => {
    try {
        const response = await api.get(`/get-filtered-data`, {
            params: {
                from,
                to,
                type,
            },
        });
        return response.data;

    } catch (error) {
        console.error("Error ", error);
        throw error;
    }
}