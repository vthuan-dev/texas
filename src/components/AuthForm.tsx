"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { ImageWithFallback } from "./figma/ImageWithFallback";

type AuthMode = "login" | "register";

interface AuthFormProps {
  mode: AuthMode;
  onSwitchMode: (mode: AuthMode) => void;
  onAuthSuccess?: () => void;
}

export function AuthForm({ mode, onSwitchMode, onAuthSuccess }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth success
    if (onAuthSuccess) {
      onAuthSuccess();
    }
  };

  return (
    <div className="min-h-[80vh] bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Auth Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <ImageWithFallback
              src="https://texaschickenvn.com/vnt_upload/weblink/logo.png"
              alt="Texas Chicken Logo"
              className="h-20 mx-auto mb-6 object-contain"
            />
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl text-gray-800">
              {mode === "login" ? "Đăng nhập" : "Tạo Tài Khoản"}
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Register-only fields */}
            {mode === "register" && (
              <>
                {/* Full Name Input */}
                <div className="space-y-2">
                  <Label htmlFor="fullname" className="text-gray-700">
                    Họ và tên
                  </Label>
                  <Input
                    id="fullname"
                    type="text"
                    placeholder="Nhập họ và tên"
                    className="h-12 bg-gray-50 border-gray-200 focus:border-[#D42323] focus:ring-[#D42323]/20"
                  />
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Nhập địa chỉ email"
                    className="h-12 bg-gray-50 border-gray-200 focus:border-[#D42323] focus:ring-[#D42323]/20"
                  />
                </div>

                {/* Phone Number Input */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700">
                    Số điện thoại
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Nhập số điện thoại"
                    className="h-12 bg-gray-50 border-gray-200 focus:border-[#D42323] focus:ring-[#D42323]/20"
                  />
                </div>
              </>
            )}

            {/* Login-only email/phone field */}
            {mode === "login" && (
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email hoặc Số điện thoại
                </Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Nhập email hoặc số điện thoại"
                  className="h-12 bg-gray-50 border-gray-200 focus:border-[#D42323] focus:ring-[#D42323]/20"
                />
              </div>
            )}

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-gray-700">
                  Mật khẩu
                </Label>
                {mode === "login" && (
                  <a
                    href="#"
                    className="text-sm text-[#B8860B] hover:text-[#A0751A] transition-colors"
                  >
                    Quên mật khẩu?
                  </a>
                )}
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  className="h-12 bg-gray-50 border-gray-200 focus:border-[#D42323] focus:ring-[#D42323]/20 pr-12"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input - Register only */}
            {mode === "register" && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700">
                  Xác nhận mật khẩu
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu"
                    className="h-12 bg-gray-50 border-gray-200 focus:border-[#D42323] focus:ring-[#D42323]/20 pr-12"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            )}

            {/* Terms & Conditions Checkbox - Register only */}
            {mode === "register" && (
              <div className="flex items-start space-x-3 py-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  className="mt-1 data-[state=checked]:bg-[#D42323] data-[state=checked]:border-[#D42323]"
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed text-gray-600">
                  Tôi đồng ý với{" "}
                  <a
                    href="#"
                    className="text-[#D42323] hover:text-[#B91C1C] transition-colors underline"
                  >
                    Điều khoản Dịch vụ
                  </a>{" "}
                  và{" "}
                  <a
                    href="#"
                    className="text-[#D42323] hover:text-[#B91C1C] transition-colors underline"
                  >
                    Chính sách Bảo mật
                  </a>
                </Label>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={mode === "register" && !acceptTerms}
              className="w-full h-12 bg-[#D42323] hover:bg-[#B91C1C] text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {mode === "login" ? "ĐĂNG NHẬP" : "ĐĂNG KÝ"}
            </Button>
          </form>

          {/* Social Login - Login only */}
          {mode === "login" && (
            <>
              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Hoặc đăng nhập bằng
                  </span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full h-12 border-gray-200 hover:bg-gray-50 rounded-lg"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-12 bg-[#1877F2] hover:bg-[#1664D8] text-white border-[#1877F2] rounded-lg"
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </Button>
              </div>
            </>
          )}

          {/* Toggle between Login/Register */}
          <div className="text-center mt-8 text-sm text-gray-600">
            {mode === "login" ? (
              <>
                Chưa có tài khoản?{" "}
                <button
                  onClick={() => onSwitchMode("register")}
                  className="text-[#D42323] hover:text-[#B91C1C] transition-colors"
                >
                  Đăng ký ngay
                </button>
              </>
            ) : (
              <>
                Đã có tài khoản?{" "}
                <button
                  onClick={() => onSwitchMode("login")}
                  className="text-[#D42323] hover:text-[#B91C1C] transition-colors"
                >
                  Đăng nhập ngay
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}