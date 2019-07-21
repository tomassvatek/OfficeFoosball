import axiosInstance from "../axiosInstance";

export default class Auth {
  login = async (username, password) => {
    const response = await axiosInstance.post('/auth/login', {
      username,
      password
    });

    const { data } = response;
    this.storeTokens(data.accessToken, data.refreshToken);
  };

  register = async(username, email, password) => {
    await axiosInstance.post('auth/register', {
      username,
      email,
      password
    });
  }

  //TODO: Implement
  isAuth = () => {
    return false;
  }

  storeTokens(accessToken, refreshToken) {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
  }
}