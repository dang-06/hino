import * as api from "../../api";

// Login user
const login = async (userData) => {
    const response = await api.login(userData);
    console.log('Full login response:', response);
    if (response.data) {
        if (response?.data?.code == 0) {
            // Lưu toàn bộ data để kiểm tra cấu trúc
            const user = response.data.data;
            const token = response.data.data.access_token;
            console.log('Login data:', response.data.data);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", JSON.stringify(token));
            return { user, token }
        } else {
            throw (response.data)
        }
    }
    return null
};

const authService = {
    login,
};

export default authService;
