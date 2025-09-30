"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function RegisterPage() {
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
              Tham gia cùng chúng tôi!
            </h2>
            <p className="text-lg text-gray-200">
              Tạo tài khoản để nhận ưu đãi đặc biệt và trải nghiệm dịch vụ tốt nhất
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Register Form */}
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
              Tạo Tài Khoản
            </h1>
          </div>

          {/* Registration Form */}
          <form className="space-y-4">
            {/* Full Name Input */}
            <div className="space-y-2">
              <Label htmlFor="fullname">Họ và tên</Label>
              <Input
                id="fullname"
                type="text"
                placeholder="Nhập họ và tên"
                className="h-12"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Nhập địa chỉ email"
                className="h-12"
              />
            </div>

            {/* Phone Number Input */}
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Nhập số điện thoại"
                className="h-12"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
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

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Nhập lại mật khẩu"
                  className="h-12 pr-12"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
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
                className="mt-1"
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
              className="w-full h-12 bg-[#D42323] hover:bg-[#B91C1C] text-white uppercase tracking-wider disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              ĐĂNG KÝ
            </Button>
          </form>

          {/* Toggle to Login */}
          <div className="text-center text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <a
              href="#"
              className="text-[#D42323] hover:text-[#B91C1C] transition-colors"
            >
              Đăng nhập ngay
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}