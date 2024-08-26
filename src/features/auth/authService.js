import * as api from "../../api";

// Login user
const login = async (userData) => {
    const response = await api.login(userData);
    if (response.data) {
        if (response?.data?.status?.code == 200) {
            const user = response.data.data.user_profile
            const token = user.user_token
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", JSON.stringify(token));
            return { user, token }
        }else{
            throw (response.data)
        }
    }
    //   const token = response.headers.authorization
    //   const refreshToken = response.headers.refreshtoken
    //   const user = {...response.data, role: 'ROLE_COMPANY'}
    //   localStorage.setItem("user", JSON.stringify(user));
    //   localStorage.setItem("token", JSON.stringify(token));
    //   localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
    //   return {user, token, refreshToken };
    return null
};

const authService = {
    login,
};

export default authService;
