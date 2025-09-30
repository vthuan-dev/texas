import { useState } from "react";
import { TexasChickenHeader } from "./TexasChickenHeader";
import { TexasChickenFooter } from "./TexasChickenFooter";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  description: string[];
}

interface CheckoutPageProps {
  product?: Product;
  quantity?: number;
  onBackToHome?: () => void;
  onOrderComplete?: () => void;
  onUserClick?: () => void;
  onLogoClick?: () => void;
  onMenuClick?: () => void;
  onAboutClick?: () => void;
  onRestaurantClick?: () => void;
  onOrderTrackingClick?: () => void;
  onNewsClick?: () => void;
  onLogout?: () => void;
  isLoggedIn?: boolean;
  userName?: string;
}

export function CheckoutPage({ 
  product, 
  quantity = 1, 
  onBackToHome, 
  onOrderComplete,
  onUserClick,
  onLogoClick,
  onMenuClick,
  onAboutClick,
  onRestaurantClick,
  onOrderTrackingClick,
  onNewsClick,
  onLogout,
  isLoggedIn,
  userName
}: CheckoutPageProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: ""
  });

  // Default product if none provided
  const defaultProduct: Product = {
    id: 100,
    name: "COMBO BURGER TEX SUPREME",
    price: "89.000đ",
    originalPrice: "105.000đ",
    image: "",
    description: []
  };

  const currentProduct = product || defaultProduct;
  
  // Calculate total (remove currency symbol and dots for calculation)
  const priceNumber = parseInt(currentProduct.price.replace(/[^\d]/g, ''));
  const totalPrice = priceNumber * quantity;
  const formattedTotal = totalPrice.toLocaleString('vi-VN') + 'đ';

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Simulate order processing
    if (onOrderComplete) {
      onOrderComplete();
    }
  };

  return (
    <div className="min-h-screen bg-[#212121] flex flex-col">
      {/* Header */}
      <TexasChickenHeader 
        onLogoClick={onLogoClick || onBackToHome}
        onUserClick={onUserClick}
        onMenuClick={onMenuClick}
        onAboutClick={onAboutClick}
        onRestaurantClick={onRestaurantClick}
        onOrderTrackingClick={onOrderTrackingClick}
        onNewsClick={onNewsClick}
        onLogout={onLogout}
        isLoggedIn={isLoggedIn}
        userName={userName}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-2xl">
          
          {/* Title */}
          <h1 className="text-gray-800 text-center mb-8">THÔNG TIN GIAO HÀNG</h1>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h2 className="text-gray-800 mb-4">Tóm tắt đơn hàng</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{currentProduct.name}</span>
                <span className="text-gray-800">{currentProduct.price}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Số lượng:</span>
                <span className="text-gray-800">{quantity}</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-800">Tổng cộng:</span>
                  <span className="text-[#D42323] text-xl">{formattedTotal}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName" className="text-gray-700">
                  Họ và tên *
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="mt-2 bg-white border-gray-300 focus:border-[#D42323] focus:ring-[#D42323]"
                  placeholder="Nhập họ và tên của bạn"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-gray-700">
                  Số điện thoại *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="mt-2 bg-white border-gray-300 focus:border-[#D42323] focus:ring-[#D42323]"
                  placeholder="Nhập số điện thoại"
                  required
                />
              </div>

              <div>
                <Label htmlFor="address" className="text-gray-700">
                  Địa chỉ nhận hàng *
                </Label>
                <textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#D42323] focus:ring-2 focus:ring-[#D42323] focus:ring-opacity-20 transition-colors duration-200 resize-none"
                  rows={3}
                  placeholder="Nhập địa chỉ chi tiết để nhận hàng"
                  required
                />
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-gray-800 mb-4">Phương thức thanh toán</h3>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border-2 border-[#D42323]">
                <div className="w-4 h-4 bg-[#D42323] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-gray-800">Thanh toán khi nhận hàng (Tiền mặt)</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#D42323] text-white py-4 px-6 rounded-xl hover:bg-[#B91C1C] transition-colors duration-200 uppercase tracking-wide shadow-lg"
            >
              HOÀN TẤT ĐẶT HÀNG
            </button>
          </form>

          {/* Note */}
          <p className="text-gray-500 text-sm text-center mt-6">
            * Các thông tin bắt buộc phải điền
          </p>
        </div>
      </main>

      {/* Footer */}
      <TexasChickenFooter />
    </div>
  );
}