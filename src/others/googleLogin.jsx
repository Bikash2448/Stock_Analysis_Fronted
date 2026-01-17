import { GoogleLogin } from "@react-oauth/google";
import { googleLoginApi } from "../api/googleauthapi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



const getErrorMessage = (err) => {
  // Backend responded with error
  if (err?.response) {
    const status = err.response.status;
    const message = err.response.data?.message;

    if (status === 401) return message || "Authentication failed";
    if (status === 500) return "Server is currently unavailable";
    if (status === 400) return message || "Invalid request";

    return "Something went wrong";
  }

  // No response → network issue
  if (err?.request) {
    return "Unable to reach server. Check your internet connection";
  }

  // Frontend / unknown error
  return err.message || "Unexpected error occurred";
};


const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      if (!credentialResponse?.credential) {
        throw new Error("No credential received from Google");
      }

      const res = await googleLoginApi(credentialResponse.credential);

      localStorage.setItem(
        "user-info",
        JSON.stringify({
          email: res.data.user.email,
          name: res.data.user.name,
          token: res.data.token,
          image: res.data.user.avatar,
        })
      );

      toast.success(`Welcome ${res.data.user.name} 🎉`);
      navigate("/home", { replace: true });

    } catch (err) {
      const message = getErrorMessage(err);

      toast.error(message);

      // Optional redirect on failure
      navigate("/signup", { replace: true });
    }
  };

  const handleError = () => {
    toast.error("Google sign-in was cancelled");
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
};

export default GoogleLoginButton;
