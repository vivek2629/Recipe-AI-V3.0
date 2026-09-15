import Home from "./components/Home";
import Main from "./components/Main.jsx";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PageNotFound from "./components/PageNotFound.jsx";

const App = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Routes>
        <Route path="/" element={<PublicRoute element={<Home />} />} />
        <Route path="/login" element={<PublicRoute element={<Login />} />} />
        <Route path="/signup" element={<PublicRoute element={<SignUp />} />} />
        <Route path="/chat" element={<ProtectedRoute element={<Main />} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default App;
