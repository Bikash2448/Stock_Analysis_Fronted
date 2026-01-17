import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  requestOtpApi,
  verifyOtpApi,
  resetPasswordApi,
  verifyOtp_ResetPassword,
} from "../api/authapi";
import { useNavigate } from "react-router-dom";

/* -------------------------------------------------------
   PASSWORD STRENGTH CHECKER
------------------------------------------------------- */
const getPasswordStrength = (password) => {
  if (password.length < 6) return "weak";
  if (/^(?=.*[a-zA-Z])(?=.*\d).+$/.test(password)) return "medium";
  if (/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&]).+$/.test(password))
    return "strong";
  return "weak";
};

export default function ForgotPasswordModal() {
  const navigate = useNavigate();

  /* -------------------------------------------------------
     STEP CONTROL
     1 → Email/Mobile
     2 → OTP Verify
     3 → Reset Password
  ------------------------------------------------------- */
  const [step, setStep] = useState(1);

  /* -------------------------------------------------------
     FORM STATES
  ------------------------------------------------------- */
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [newPassword, setConfirmPassword] = useState("");

  /* -------------------------------------------------------
     UX STATES
  ------------------------------------------------------- */
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [resendCount, setResendCount] = useState(0);

  const MAX_RESEND = 3;
  const passwordStrength = getPasswordStrength(password);

  /* -------------------------------------------------------
     OTP TIMER
  ------------------------------------------------------- */
  useEffect(() => {
    if (step !== 2 || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [step, timer]);

  /* -------------------------------------------------------
     STEP 1 → SEND OTP
  ------------------------------------------------------- */
  const handleSendOtp = async () => {
    if (!email) return toast.error("Enter email or mobile");

    setLoading(true);
    try {
      console.log("identifier",email);
      const a = await requestOtpApi({ email });
      console.log("noo",a)
      toast.success("OTP sent successfully");

      setStep(2);
      setTimer(60);
      setOtp(["", "", "", "", "", ""]);
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP send failed");
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------------------------------
     OTP INPUT AUTO-FOCUS
  ------------------------------------------------------- */
  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  /* -------------------------------------------------------
     STEP 2 → VERIFY OTP
  ------------------------------------------------------- */
  const handleVerifyOtp = async () => {
    const finalOtp = otp.join("");
    console.log("otp",finalOtp);
    if (finalOtp.length !== 6) return toast.error("Enter valid OTP");

    setLoading(true);
    try {
      await verifyOtp_ResetPassword({ email, otp: finalOtp });
      toast.success("OTP verified");

      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------------------------------
     STEP 3 → RESET PASSWORD
  ------------------------------------------------------- */
  const handleResetPassword = async () => {
    if (!password || !newPassword)
      return toast.error("All fields required");

    if (password !== newPassword)
      return toast.error("Passwords do not match");

    setLoading(true);
    try {
      await resetPasswordApi({ email, newPassword });
      toast.success("Password updated successfully");

      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------------------------------
     RESEND OTP (LIMITED)
  ------------------------------------------------------- */
  const handleResendOtp = () => {
    if (resendCount >= MAX_RESEND) {
      return toast.error("OTP resend limit reached");
    }
    setResendCount((c) => c + 1);
    handleSendOtp();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-[#1f2937]/80 backdrop-blur-xl border border-white/10 shadow-2xl p-6 animate-fadeIn">

        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white">
            Forgot Password
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            {step === 1 && "Receive OTP to reset password"}
            {step === 2 && "Verify OTP"}
            {step === 3 && "Set new password"}
          </p>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="mt-6 space-y-4">
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-black/30 px-4 py-3 text-white border border-white/10 focus:border-indigo-500 outline-none"
            />
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 py-3 font-semibold text-white"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="mt-6 space-y-4">
            <div className="flex justify-between gap-2">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  value={digit}
                  maxLength={1}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                  className="w-12 h-12 text-center text-lg rounded-lg bg-black/30 text-white border border-white/10 focus:border-indigo-500 outline-none"
                />
              ))}
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 py-3 font-semibold text-white"
            >
              Verify OTP
            </button>

            <p className="text-center text-sm text-gray-400">
              {timer > 0 ? (
                <>Resend OTP in <span className="text-indigo-400">{timer}s</span></>
              ) : resendCount >= MAX_RESEND ? (
                <span className="text-red-400">Resend limit reached</span>
              ) : (
                <span
                  onClick={handleResendOtp}
                  className="text-indigo-400 cursor-pointer"
                >
                  Resend OTP
                </span>
              )}
            </p>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="mt-6 space-y-4">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-black/30 px-4 py-3 text-white border border-white/10 focus:border-indigo-500 outline-none"
            />

            {/* PASSWORD STRENGTH */}
            {password && (
              <p
                className={`text-sm ${
                  passwordStrength === "weak"
                    ? "text-red-400"
                    : passwordStrength === "medium"
                    ? "text-yellow-400"
                    : "text-green-400"
                }`}
              >
                Strength: {passwordStrength.toUpperCase()}
              </p>
            )}

            <input
              type="password"
              placeholder="Confirm Password"
              value={newPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg bg-black/30 px-4 py-3 text-white border border-white/10 focus:border-indigo-500 outline-none"
            />

            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 py-3 font-semibold text-white"
            >
              Reset Password
            </button>
          </div>
        )}

        {/* FOOTER */}
        <button
          onClick={() => navigate("/login")}
          className="mt-6 w-full text-sm text-gray-400 hover:text-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}