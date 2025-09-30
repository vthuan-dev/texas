"use client";

import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface SimpleRegisterPageProps {
  onBack?: () => void;
  onSwitchToLogin?: () => void;
}

export function SimpleRegisterPage({ onBack, onSwitchToLogin }: SimpleRegisterPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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

        {/* Register Card */}
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
              Tạo Tài Khoản
            </h1>
          </div>

          {/* Registration Form */}
          <form className="space-y-5">
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

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Mật khẩu
              </Label>
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

            {/* Confirm Password Input */}
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

            {/* Terms & Conditions Checkbox */}
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

            {/* Register Button */}
            <Button
              type="submit"
              disabled={!acceptTerms}
              className="w-full h-12 bg-[#D42323] hover:bg-[#B91C1C] text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              ĐĂNG KÝ
            </Button>
          </form>

          {/* Toggle to Login */}
          <div className="text-center mt-8 text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-[#D42323] hover:text-[#B91C1C] transition-colors"
            >
              Đăng nhập ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}