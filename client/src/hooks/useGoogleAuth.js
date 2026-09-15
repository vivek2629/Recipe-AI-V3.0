import { useGoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../services/authService";
import Cookies from "js-cookie";

const useGoogleAuth = (navigate, setErrorMsg) => {
  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const response = await googleLogin(authResult["code"]);
        // const { name, email, image } = response.data.user;
        const token = response.data.token;
        Cookies.set("jwt_token", token, { expires: 7 });
        navigate("/chat", { replace: true });
      }
    } catch (error) {
      // console.error("Error while requesting google code : ", error);
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  const googleLoginFn = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return googleLoginFn;
};

export default useGoogleAuth;
