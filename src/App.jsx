import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/login";
import SignUp from "./Pages/signup";
import ForgotPasswordModal from "./Pages/forgetPasswordpage";
import Notfoundpage from "./others/notfoundpage";

import Dashboard from "./Pages/dashboard";
import StockChartPage from "./Pages/stockChart";
import UserHome from "./Pages/userHomePage";
import About from "./Pages/about";
import Service from "./Pages/service";

// import AuthLayout from "./layouts/AuthLayout";
// import ProtectedRoute from "./routes/ProtectedRoute";
import AppLayout from "./services/AuthLayout";
import ProtectedRoute from "./others/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ===== PUBLIC ROUTES ===== */}
        <Route path="/" element={<UserHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot_password" element={<ForgotPasswordModal />} />

        {/* ===== PROTECTED ROUTES ===== */}
        {/* <Route
          element={
            <ProtectedRoute>
              <AuthLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />

          <Route path="/home" element={<Home />} />
          <Route path="/stockchart" element={<StockChartPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route> */}

        <Route element={<AppLayout />}>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stockchart" element={<StockChartPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
        </Route>

        {/* ===== 404 ===== */}
        <Route path="*" element={<Notfoundpage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
