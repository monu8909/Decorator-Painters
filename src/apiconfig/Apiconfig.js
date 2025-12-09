const API_BASE_URL = 'https://decorator-and-painters-backend-fa45.onrender.com'

export const API = {
    USER_REGISTER: `${API_BASE_URL}/api/auth/register-worker`,
    GET_WORKERS: `${API_BASE_URL}/api/auth/workers-list`,
    USER_UPDATE: `${API_BASE_URL}/api/auth/update-worker`,
    DELETE_WORKER: `${API_BASE_URL}/api/auth/delete-worker`,
    ATTENDANCE: `${API_BASE_URL}/api/auth/mark-attendance`,
    PAYMENT: `${API_BASE_URL}/api/auth/add-payment`,
    BOOKING: `${API_BASE_URL}/api/booking/bookings`,
    CREATE_BOOKING: `${API_BASE_URL}/api/booking/create-booking`,
    UPDATE_BOOKING_STATUS: `${API_BASE_URL}/api/booking`, // /:id/status will be appended in the component
}
