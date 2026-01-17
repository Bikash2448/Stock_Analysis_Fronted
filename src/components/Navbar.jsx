import { useState } from "react";
import { logoutApi } from "../api/userapi";
import toast from "react-hot-toast";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const logoutUser = async()=>{
    try{
        await logoutApi();
        toast.success("Log out successfully");
    }catch(err){
        toast.error(err.response?.data?.message || "Logout Error")
    }
  }

  return (
    <nav className="bg-[#5fa7ad] text-white">
      <div className="w-full px-4">
        <div className="flex items-center justify-between h-16">

          {/* LEFT: Logo */}
          <div className="text-2xl font-bold tracking-wide">
            Nandi
          </div>

          {/* CENTER: Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-sm font-medium uppercase">
            <a href="#" className="hover:text-gray-200">Home</a>
            <a href="#" className="hover:text-gray-200">About</a>
            <a href="#" className="hover:text-gray-200">Services</a>
            <a href="#" className="hover:text-gray-200">Portfolio</a>
            <a href="#" className="hover:text-gray-200">Blog</a>
            <a href="#" className="hover:text-gray-200">Contact</a>
          </div>

          {/* RIGHT: Profile + Mobile Menu */}
          <div className="flex items-center gap-4">

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition"
              >
                <span className="text-sm font-semibold">N</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-gray-700 rounded-md shadow-lg overflow-hidden z-50">
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                    Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={logoutUser}>
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-sm uppercase">
          <a href="#" className="block hover:text-gray-200">Home</a>
          <a href="#" className="block hover:text-gray-200">About</a>
          <a href="#" className="block hover:text-gray-200">Services</a>
          <a href="#" className="block hover:text-gray-200">Portfolio</a>
          <a href="#" className="block hover:text-gray-200">Blog</a>
          <a href="#" className="block hover:text-gray-200">Contact</a>
        </div>
      )}
    </nav>
  );
}