import React from "react";
import { useNavigate } from "react-router-dom";

const Notfoundpage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white px-4">
      <div className="text-center max-w-md">
        {/* Big 404 */}
        <h1 className="text-8xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          404
        </h1>

        {/* Message */}
        <h2 className="mt-4 text-2xl font-semibold">
          Page Not Found
        </h2>
        <p className="mt-2 text-gray-400">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Action */}
        <div className="mt-6">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 font-medium"
          >
            🔐 Go to Login
          </button>
        </div>

        {/* Sub text */}
        <p className="mt-6 text-sm text-gray-500">
          If you think this is a mistake, please contact support.
        </p>
      </div>
    </div>
  );
};

export default Notfoundpage;