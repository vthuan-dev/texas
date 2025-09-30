"use client";

import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface SimpleLoginPageProps {
  onBack?: () => void;
  onSwitchToRegister?: () => void;
}

export function SimpleLoginPage({ onBack, onSwitchToRegister }: SimpleLoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Back Button */}
        {onBack && (
          <div className="mb-6">
            <Button
              onClick={onBack}
              variant="ghost"
              className="text-gray-600 hover:text-gray-800 p-0"
            >
              <ArrowLeft size={20} className="mr-2" />
              Quay lại
            </Button>
          </div>
        )}

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1632613454377-9928769f5685?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNoaWNrZW4lMjByZXN0YXVyYW50JTIwbG9nbyUyMHJlZHxlbnwxfHx8fDE3NTkxNDU3Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Texas Chicken Logo"
              className="h-20 mx-auto mb-6 object-contain"
            />
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl text-gray-800">
              Đăng nhập
            </h1>
          </div>

          {/* Login Form */}
          <form className="space-y-6">
            {/* Email/Phone Input */}
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

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-gray-700">
                  Mật khẩu
                </Label>
                <a
                  href="#"
                  className="text-sm text-[#B8860B] hover:text-[#A0751A] transition-colors"
                >
                  Quên mật khẩu?
                </a>
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

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-[#D42323] hover:bg-[#B91C1C] text-white rounded-lg"
            >
              ĐĂNG NHẬP
            </Button>
          </form>

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

          {/* Toggle to Register */}
          <div className="text-center mt-8 text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <button
              onClick={onSwitchToRegister}
              className="text-[#D42323] hover:text-[#B91C1C] transition-colors"
            >
              Đăng ký ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}