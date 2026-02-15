import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import GoogleLoginButton from "../others/googleLogin";
import toast from "react-hot-toast";
import { useState } from "react";
import { loginApi } from "../api/userapi";

export default function Login() {
  const [showForgot, setShowForgot] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const payload = {
      // mobile:form.get("mobile"),
      email: form.get("email"),
      password: form.get("password"),
      withCredentials: true
    };
    // 🔥 Call login API here
    try {
      const res = await loginApi(payload);
      console.log("form",res);
      toast.success(res.data.message || "Login successfully");
      navigate("/home", { replace: true });
    } catch (error) {
      console.log("err",error)
     const message =
        error?.response?.data?.message ||
        error?.message ||
        "Login failed";

      toast.error(message);
      navigate("/login");
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-black">
      <div className="w-full max-w-sm p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl animate-fadeIn">

        {/* Logo */}
        <div className="text-center">
          <img
            className="mx-auto h-16 w-16 rounded-full object-cover shadow-lg"
            src="https://4kwallpapers.com/images/walls/thumbs_3t/13813.png"
            alt="Logo"
          />
          <h2 className="mt-6 text-2xl font-bold text-white">
            Welcome Back
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Login to continue trading
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="mt-2 w-full rounded-lg bg-black/30 px-4 py-3 text-white placeholder-gray-400 outline-none border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-300">
              
              </label>
              <span
                onClick={() => navigate("/forgot_password")}
                // onClick={() => setShowForgot(true)}
                className="text-sm text-indigo-400 hover:text-indigo-300 cursor-pointer"
              >
                Forgot Password?
              </span>
              {/* <ForgotPasswordModal
                open={showForgot}
                onClose={() => setShowForgot(false)}
              /> */}
            </div>

            {/* <input
              name="password"
              type="password"
              required
              placeholder="Password"
              className="mt-2 w-full rounded-lg bg-black/30 px-4 py-3 text-white placeholder-gray-400 outline-none border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            /> */}
            <div className="relative mt-2">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                className="w-full rounded-lg bg-black/30 px-4 py-3 pr-12 text-white placeholder-gray-400 outline-none border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 hover:text-blue-700"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 py-3 font-semibold text-white transition shadow-lg hover:shadow-indigo-500/40"
          >
            Log In
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer"
          >
            Sign up
          </span>
        </p>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        {/* Google Auth */}
        <GoogleLoginButton />

      </div>
    </div>
  );
}