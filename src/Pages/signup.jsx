import { useEffect, useState } from "react";
import GoogleLoginButton from "../others/googleLogin";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { sendOtpApi, verifyOtpApi } from "../api/authapi";
import { signUpApi } from "../api/userapi";


export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  // const [isVerified,setIsVerified] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (otp.length === 6) {
      verifyOtp();
    }
  }, [otp]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setShowOtp(true);
    console.log("Hello",form)
    if (!form.mobile || !form.email) {
      
      toast.error("Mobile & Email required");
      return;
    }

    try {
      setLoading(true);
      console.log("hii")
      const user = await sendOtpApi({
        email: form.email,
        mobile: form.mobile,
      });
      console.log("send otp in handle submit",user.data);
      if(user.data.success == false){
        toast.error(user?.data?.message || "Email or Mobile No All Reday Used");
      }else{
        toast.success("OTP sent successfully");
        setShowOtp(true);
      }
      
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP failed");
      navigate("/signup");
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async () => {
    try {
      const res = await signUpApi(form);

      toast.success(res.data.message || "Registered successfully");
      navigate("/login", { replace: true });

      setForm({
        name: "",
        mobile: "",
        email: "",
        password: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
      navigate("/login");
    }
  };

// verify the mobile otp
  const verifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error("Enter 6 digit OTP");
      return;
    }

    try {
      setLoading(true);

      await verifyOtpApi({
        email: form.email,
        mobile: form.mobile,
        otp,
      });

      toast.success("OTP verified 🎉");
      // setIsVerified(true);
      setShowOtp(false);
      
      await registerUser(); // 🔥 IMPORTANT
      setOtp("");

    } catch (err) {
      setOtp("");
      toast.error(err.response?.data?.message || "Invalid OTP");
      navigate("/signup");
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      {/*SIGN UP PAGE*/}
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
              Create your account
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Start trading smarter today
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">

            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg bg-black/30 px-4 py-3 text-white placeholder-gray-400 outline-none border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
            
            <input
                name="mobile"
                placeholder="Mobile"
                value={form.mobile}
                onChange={handleChange}
                className="w-full rounded-lg bg-black/30 px-4 py-3 text-white placeholder-gray-400 outline-none border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
            <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg bg-black/30 px-4 py-3 text-white placeholder-gray-400 outline-none border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg bg-black/30 px-4 py-3 text-white placeholder-gray-400 outline-none border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-lg py-3 font-semibold text-white transition shadow-lg
                ${loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/40"
                }`}
            >
              {loading ? "Sending OTP..." : "Sign Up"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-400">
            Have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer"
            >
              Login
            </span>
          </p>

          {/* Divider */}
          <div className="flex items-center my-5">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          {/* Google Login */}
          <GoogleLoginButton />
        </div>
      </div>

      {/* OTP MODAL*/}
      {showOtp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur">
          <div className="w-full max-w-sm mx-4 p-6 rounded-2xl bg-white/10 border border-white/20 shadow-2xl">

            <h3 className="text-center text-xl font-bold text-white">
              OTP Verification
            </h3>

            <p className="text-center text-gray-400 text-sm mt-1">
              Enter the 6-digit OTP sent to your mobile
            </p>

            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="mt-6 w-full text-center tracking-[0.5em] text-2xl rounded-lg bg-black/40 px-4 py-3 text-white outline-none border border-white/10 focus:border-green-500"
              placeholder="••••••"
            />

            <button
              disabled={loading}
              onClick={verifyOtp}
              className={`w-full mt-6 rounded-lg py-3 font-semibold text-white transition
                ${loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
                }`}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              onClick={() => setShowOtp(false)}
              className="w-full mt-3 text-sm text-red-400 hover:text-red-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </>
  );
}