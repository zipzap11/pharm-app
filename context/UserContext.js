import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import { deviceStorage } from "../storage/deviceStorage";

export const UserContext = createContext({
  user: {},
  isLogin: false,
  setIslogin: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await deviceStorage.getItem("access_token");
      const refreshToken = await deviceStorage.getItem("refresh_token");
      console.log('access = ', accessToken)
      console.log('refresh = ', refreshToken)
      if (!accessToken) {
        return;
      }
      const headers = { Authorization: `bearer ${accessToken}` };
      try {
        const resp = await axios.get(`${API_BASE_URL}/auth/validate`, {headers});
        console.log("resp = ", resp);
        setIsLogin(true);
      } catch (err) {
        try {
          const body = {
            refresh_token: refreshToken,
          };
          const refreshResp = await axios.post(
            `${API_BASE_URL}/auth/refresh`,
            body
          );
          console.log("refresh resp = ", refreshResp);
          const { refresh_token, access_token } = refreshResp.data.data;
          console.log("refresh token = ", refresh_token);
          console.log("access token = ", access_token);
          await deviceStorage.saveItem("refresh_token", refresh_token);
          await deviceStorage.saveItem("access_token", access_token);
          setIsLogin(true);
        } catch (innerErr) {
          console.log("innerErr = ", innerErr);
        }
      }
    };
    fetchToken();
  }, []);
  return (
    <UserContext.Provider
      value={{
        user: user,
        setUser: setUser,
        isLogin: isLogin,
        setIslogin: setIsLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
