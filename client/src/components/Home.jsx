import { Link } from "react-router-dom";
import Aurora from "../reactbits/Aurora";
import SpecularButton from "../reactbits/SpecularButton";
function Home() {
  return (
    <div className="bg-black min-h-screen relative overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0">
        <Aurora
          colorStops={["#5227FF", "#B497CF", "#7cff67"]}
          blend={0.5}
          amplitude={1.0}
          speed={1}
        />
      </div>

      <div className="relative z-10 pt-[50px] pl-5 md:pl-5 flex flex-col items-center md:flex-row md:items-start gap-10 md:gap-20">
        {/* Left Content */}
        <div className="flex flex-col gap-10 md:gap-20 px-5 flex-1">
          <div className="flex flex-col items-center gap-1 mt-[400px] w-[90%] md:w-[100%]">
            <h1 className="text-[#FFFFFF] text-[20px] md:text-[24px] italic text-center">
              Welcome to Recipe AI
            </h1>
            <p className="text-[#FFFFFF] text-[12px] md:text-[14px] md:leading-7 text-center">
              Turn everyday ingredients into delicious recipes with the power of
              AI. Discover, cook, and enjoy personalized meals in seconds.
            </p>{" "}
            <div className="w-50 text-center mt-5">
              <Link to="/login">
                <SpecularButton
                  size="md"
                  radius={10}
                  tint="#ffffff"
                  tintOpacity={0}
                  blur={0}
                  textColor="#f5f5f5"
                  lineColor="#ffffff"
                  baseColor="#525252"
                  intensity={1}
                  shineSize={10}
                  shineFade={40}
                  thickness={1}
                  speed={0.35}
                  followMouse
                  proximity={250}
                  autoAnimate={false}
                  className="h-10"
                >
                  Get Started
                </SpecularButton>
              </Link>
            </div>
          </div>
          <p className="text-[#999999] text-[10px] mt-5 justify-end self-center text-center">
            Recipe.AI is designed with secure authentication and responsible
            data handling, protecting your account and chat history. By
            continuing, you agree to use the service responsibly and understand
            that AI-generated recipes may require verification for allergies,
            nutrition, and food safety.
          </p>
        </div>
      </div>
    </div>
  );
}
export default Home;
