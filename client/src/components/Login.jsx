import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import useGoogleAuth from "../hooks/useGoogleAuth";
import Cookies from "js-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const userDetails = {
      email,
      password,
    };

    try {
      const { response, data } = await loginUser(userDetails);
      if (response.ok === true) {
        Cookies.set("jwt_token", data.jwtToken, { expires: 7 });
        navigate("/chat", { replace: true });
      } else {
        setErrorMsg(data.errorMsg);
      }
    } catch (error) {
      // console.error("Login error:", error);
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  const handleGoogleLogin = useGoogleAuth(navigate, setErrorMsg);

  return (
    <div className="bg-[#FFFFFF] min-h-screen relative overflow-hidden flex flex-col lg:flex-row lg:justify-center lg:items-center gap-20">
      <div className="bg-[#DBDBDB] w-[485px] h-[589px] flex flex-col pt-[70px] pl-[40px] pr-5 gap-15 rounded-[20px] hidden lg:flex">
        <img
          src="https://res.cloudinary.com/dpencg7d8/image/upload/v1753942321/Gemini_Generated_Image_ctwgycctwgycctwg__1_-removebg-preview_f2jdcg.png"
          className="h-15 mr-5 md:h-15 self-start"
          alt="logo"
        />
        <p
          className="text-[#383838] text-[15px] leading-6 ml-4 mr-5"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Recipe.AI is your intelligent cooking companion, helping you generate
          personalized recipes, discover new flavors, and turn everyday
          ingredients into delicious meals with the power of AI.
        </p>
      </div>
      <img
        src="https://res.cloudinary.com/dpencg7d8/image/upload/v1753942321/Gemini_Generated_Image_ctwgycctwgycctwg__1_-removebg-preview_f2jdcg.png"
        className="h-15  self-start hidden md:flex ml-[50px] mt-[40px] lg:hidden"
        alt="logo"
      />
      <form
        className="self-center w-[369px] flex flex-col gap-8 pt-[50px] pl-[30px] pr-[35px] md:p-0"
        style={{ fontFamily: "Roboto, sans-serif" }}
        onSubmit={handleLoginSubmit}
      >
        <img
          src="https://res.cloudinary.com/dpencg7d8/image/upload/v1753942321/Gemini_Generated_Image_ctwgycctwgycctwg__1_-removebg-preview_f2jdcg.png"
          className="h-15 self-start md:hidden"
          alt="logo"
        />

        <div>
          <h1 className="text-[#383838] text-[20px] md:text-[30px] font-bold mb-1">
            Welcome Back Buddy !
          </h1>
          <p className="text-[#9B9B9B] text-[10px]">
            Don’t have an account ?
            <span className="text-[#565656] font-bold ml-2 cursor-pointer">
              <Link to="/signup">Sign Up</Link>
            </span>
          </p>
        </div>
        <div className="fillups flex flex-col gap-5">
          <div className="flex flex-col gap-1 ">
            <label
              htmlFor="email"
              className="text-[#383838] ml-1 text-[12px]"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="bg-[#D9D9D9] text-[#383838] placeholder:text-[12px] h-10 md:h-12 pl-2 rounded-sm outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <label
              htmlFor="password"
              className="text-[#383838] ml-1 text-[12px]"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="bg-[#D9D9D9] text-[#383838] placeholder:text-[12px] h-10 md:h-12 pl-2 rounded-sm outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="bg-[#383838] text-[#FFFFFF] w-full h-10 rounded-sm mt-5 cursor-pointer"
          >
            Login
          </button>
          <button
            type="button"
            className="border border-[#383838] flex items-center justify-center gap-1 w-full mt-2 h-10 text-[#383838] text-sm rounded-sm cursor-pointer"
            onClick={handleGoogleLogin}
          >
            <img
              src="https://res.cloudinary.com/dpencg7d8/image/upload/v1787415530/Screenshot_2026-08-22_214802-removebg-preview_w9ktlq.png"
              alt="logo"
              className="h-6"
            />
            Continue with Google
          </button>
          {errorMsg && (
            <p className="text-[#d90e00] text-[12px] mt-1">*{errorMsg}</p>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;
