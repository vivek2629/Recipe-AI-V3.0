import NotFound from "../lottiefiles/NotFound";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-7">
      <NotFound />
      <h1 className="font-bold text-center text-md md:text-lg">
        Oops ! The page you were looking for doesn't exist
      </h1>

      <Link to="/">
        <button
          type="button"
          className="bg-[#2C5745] text-white py-2 px-4 rounded cursor-pointer hover:bg-[#0B0909] transition-colors duration-300"
        >
          Go Home
        </button>
      </Link>
    </div>
  );
}

export default PageNotFound;
