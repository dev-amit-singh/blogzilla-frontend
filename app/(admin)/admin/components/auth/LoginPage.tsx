"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

type AuthMode = "login" | "forgot" | "reset";

export default function LoginPage() {
  const router = useRouter();

  // Mode State
  const [mode, setMode] = useState<AuthMode>("login");

  // Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // --- Handlers ---

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/admin/login`,
        { email, password },
        { withCredentials: true }
      );
      router.push("/admin");
      router.refresh();
    } catch (error: any) {
      setErrorMsg(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/admin/sent-otp`, { email });

      setSuccessMsg(res.data.message);

      // CLEAR fields BEFORE switching
      setOtp("");
      setNewPassword("");

      setMode("reset");

    } catch (error: any) {
      setErrorMsg(error?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/admin/reset-password`, {
        email,
        otp,
        newPassword,
      });
      setSuccessMsg("Password reset successfully! Please login now.");
      setMode("login"); // Go back to login
      setPassword(""); // Clear old password
      setOtp("");
      setNewPassword("");
    } catch (error: any) {
      setErrorMsg(error?.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

        {/* Navigation / Back Button */}
        {mode !== "login" && (
          <button
            onClick={() => { setMode("login"); setErrorMsg(""); setSuccessMsg(""); }}
            className="mb-4 flex items-center text-sm text-gray-500 hover:text-black transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" /> Back to Login
          </button>
        )}

        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          {mode === "login" && "Admin Login"}
          {mode === "forgot" && "Forgot Password"}
          {mode === "reset" && "Update Password"}
        </h2>

        {/* --- 1. LOGIN FORM --- */}
        {mode === "login" && (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email" required value={email} name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-black outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-600">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border px-4 py-2 pr-10 focus:ring-2 focus:ring-black outline-none"
                />
                <button
                  type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-black"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button disabled={loading} className="w-full rounded-lg bg-black py-2 text-white font-semibold hover:bg-gray-800 transition-colors">
              {loading ? "Logging in..." : "Login"}
            </button>
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => { setMode("forgot"); setErrorMsg(""); setSuccessMsg(""); setPassword(""); }}
                className="text-sm text-gray-600 hover:underline"
              >
                Forgot your password?
              </button>
            </div>
          </form>
        )}

        {/* --- 2. FORGOT PASSWORD FORM (SEND OTP) --- */}
        {mode === "forgot" && (
          <form onSubmit={handleSendOtp}>
            <p className="mb-4 text-sm text-gray-600">Enter your email and we'll send you a 6-digit code.</p>
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-600">Email Address</label>
              <input
                type="email" required placeholder="name@example.com"
                value={email} name="email" onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-black outline-none"
              />
            </div>
            <button disabled={loading} className="w-full rounded-lg bg-black py-2 text-white font-semibold hover:bg-gray-800 transition-colors">
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* --- 3. RESET PASSWORD FORM (WITH AUTO-FILLED EMAIL) --- */}
        {mode === "reset" && (
          <form onSubmit={handleResetPassword} autoComplete="new-password">
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-600">Account Email</label>
              <input
                type="email" value={email} name="email" disabled
                className="w-full rounded-lg border bg-gray-100 px-4 py-2 text-gray-500 cursor-not-allowed"
              />
            </div>

            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-600">6-Digit OTP</label>
              <input
                type="text" required placeholder="Enter OTP from email"
                value={otp} onChange={(e) => setOtp(e.target.value)} name="otp"
                className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div className="mb-6">
              <label className="mb-1 block text-sm font-medium text-gray-600">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  name="newPassword"
                  autoComplete="new-password" // <-- ADD THIS LINE
                  className="w-full rounded-lg border px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-600 outline-none"
                />
                <button
                  type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-black"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button disabled={loading} className="w-full rounded-lg bg-blue-600 py-2 text-white font-semibold hover:bg-blue-700 transition-colors">
              {loading ? "Resetting..." : "Update Password"}
            </button>
          </form>
        )}

        {/* --- FEEDBACK MESSAGES --- */}
        {errorMsg && (
          <div className="mt-4 rounded-md bg-red-50 p-3">
            <p className="text-center text-sm text-red-600">{errorMsg}</p>
          </div>
        )}
        {successMsg && (
          <div className="mt-4 rounded-md bg-green-50 p-3">
            <p className="text-center text-sm text-green-600">{successMsg}</p>
          </div>
        )}

      </div>
    </div>
  );
}