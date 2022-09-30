import { useRecoilState, useSetRecoilState } from "recoil";
import axiosInstance from "@/api/axiosInstance";
import { isAuthState, userState } from "./userState";

function useUserActions() {
  const setIsAuth = useSetRecoilState(isAuthState);
  const [userData, setUserData] = useRecoilState(userState);

  const loginUser = async (loginData) => {
    const {
      data: { loginSucess, userId },
    } = await axiosInstance({
      method: "POST",
      url: "/api/users/login",
      data: loginData,
    });
    setUserData((prev) => ({ ...prev, _id: userId }));
    return loginSucess;
  };

  const logoutUser = async () => {
    const {
      data: { success },
    } = await axiosInstance({
      method: "POST",
      url: "/api/users/login",
      data: userData._id,
    });
    setIsAuth(false);
    setUserData({});
    return success;
  };

  const registerUser = async (registerData) => {
    const {
      data: { success },
    } = await axiosInstance({
      method: "POST",
      url: "/api/users/register",
      data: registerData,
    });
    return success;
  };

  const authUser = async () => {
    const { data } = axiosInstance({ method: "GET", url: "/api/users/auth" });
    setUserData((prev) => ({ ...prev, ...data }));
    setIsAuth(data?.isAuth || false);
  };

  return { loginUser, logoutUser, registerUser, authUser };
}

export default useUserActions;
