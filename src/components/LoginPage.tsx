"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Food Image */}
      <div className="lg:flex-1 relative min-h-[300px] lg:min-h-screen">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1586793783658-261cddf883ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNoaWNrZW4lMjBtZWFsJTIwdmVydGljYWx8ZW58MXx8fHwxNzU5MTI5MDg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Texas Chicken Meal"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Optional overlay content */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="text-center text-white max-w-md">
            <h2 className="text-2xl lg:text-3xl mb-4 text-[#FFC72C]">
              Chào mừng trở lại!
            </h2>
            <p className="text-lg text-gray-200">
              Đăng nhập để trải nghiệm hương vị Texas Chicken đặc biệt
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="lg:flex-1 flex items-center justify-center p-6 lg:p-12 bg-white">
        <div className="w-full max-w-md space-y-6">
          {/* Logo */}
          <div className="text-center">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1632613454377-9928769f5685?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNoaWNrZW4lMjByZXN0YXVyYW50JTIwbG9nbyUyMHJlZHxlbnwxfHx8fDE3NTkxNDU3Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Texas Chicken Logo"
              className="h-16 mx-auto mb-6 object-contain"
            />
          </div>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-2xl text-gray-800 uppercase tracking-wide">
              Đăng Nhập
            </h1>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full h-12 border-gray-300 hover:bg-gray-50"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </Button>

            <Button
              variant="outline"
              className="w-full h-12 border-gray-300 hover:bg-gray-50"
            >
              <svg className="w-5 h-5 mr-3" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Sign in with Facebook
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 uppercase tracking-wider">
                HOẶC
              </span>
            </div>
          </div>

          {/* Login Form */}
          <form className="space-y-4">
            {/* Email/Phone Input */}
            <div className="space-y-2">
              <Label htmlFor="email">Email hoặc Số điện thoại</Label>
              <Input
                id="email"
                type="text"
                placeholder="Nhập email hoặc số điện thoại"
                className="h-12"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Mật khẩu</Label>
                <a
                  href="#"
                  className="text-sm text-[#D42323] hover:text-[#B91C1C] transition-colors"
                >
                  Quên mật khẩu?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  className="h-12 pr-12"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-[#D42323] hover:bg-[#B91C1C] text-white uppercase tracking-wider"
            >
              ĐĂNG NHẬP
            </Button>
          </form>

          {/* Toggle to Register */}
          <div className="text-center text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <a
              href="#"
              className="text-[#D42323] hover:text-[#B91C1C] transition-colors"
            >
              Đăng ký ngay
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}