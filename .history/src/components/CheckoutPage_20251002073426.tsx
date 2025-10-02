import React, { useState, useCallback, useMemo, memo } from "react";
import { TexasChickenHeader } from "./TexasChickenHeader";
import { TexasChickenFooter } from "./TexasChickenFooter";

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

// Memoized Input Field Component with native input to prevent re-renders
const MemoizedInputField = memo(({ 
  id, 
  label, 
  type, 
  value, 
  onChange, 
  placeholder 
}: { 
  id: string; 
  label: string; 
  type: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  placeholder: string;
}) => {
  console.log(`🔵 MemoizedInputField ${id} render`);
  return (
    <div>
      <label htmlFor={id} className="text-gray-700 text-sm font-medium block mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-[#D42323] focus:ring-2 focus:ring-[#D42323] focus:ring-opacity-20 focus:outline-none transition-colors duration-200"
        placeholder={placeholder}
        required
      />
    </div>
  );
});

MemoizedInputField.displayName = 'MemoizedInputField';

// Memoized Textarea Component
const MemoizedTextarea = memo(({ 
  id, 
  label, 
  value, 
  onChange, 
  placeholder 
}: { 
  id: string; 
  label: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; 
  placeholder: string;
}) => {
  console.log(`🟢 MemoizedTextarea ${id} render`);
  return (
    <div>
      <label htmlFor={id} className="text-gray-700 text-sm font-medium block mb-2">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-[#D42323] focus:ring-2 focus:ring-[#D42323] focus:ring-opacity-20 focus:outline-none transition-colors duration-200 resize-none"
        rows={3}
        placeholder={placeholder}
        required
      />
    </div>
  );
});

MemoizedTextarea.displayName = 'MemoizedTextarea';

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
  console.log('🔄 CheckoutPage RE-RENDER');
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: ""
  });

  // Default product if none provided - memoized to prevent recreation
  const defaultProduct = useMemo<Product>(() => ({
    id: 100,
    name: "COMBO BURGER TEX SUPREME",
    price: "89.000đ",
    originalPrice: "105.000đ",
    image: "",
    description: []
  }), []);

  const currentProduct = product || defaultProduct;
  
  // Calculate total (remove currency symbol and dots for calculation) - memoized
  const { priceNumber, totalPrice, formattedTotal } = useMemo(() => {
    const price = parseInt(currentProduct.price.replace(/[^\d]/g, ''));
    const total = price * quantity;
    const formatted = total.toLocaleString('vi-VN') + 'đ';
    return {
      priceNumber: price,
      totalPrice: total,
      formattedTotal: formatted
    };
  }, [currentProduct.price, quantity]);

  // Separate handlers for each field to prevent unnecessary re-renders
  const handleFullNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, fullName: e.target.value }));
  }, []);

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, phone: e.target.value }));
  }, []);

  const handleAddressChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, address: e.target.value }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
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
  }, [formData.fullName, formData.phone, formData.address, onOrderComplete]);

  // Memoize the logo click handler to prevent creating new reference
  const logoClickHandler = useMemo(() => onLogoClick || onBackToHome, [onLogoClick, onBackToHome]);

  return (
    <div className="min-h-screen bg-[#212121] flex flex-col">
      {/* Header */}
      <TexasChickenHeader 
        onLogoClick={logoClickHandler}
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
              <MemoizedInputField
                id="fullName"
                label="Họ và tên *"
                type="text"
                value={formData.fullName}
                onChange={handleFullNameChange}
                placeholder="Nhập họ và tên của bạn"
              />

              <MemoizedInputField
                id="phone"
                label="Số điện thoại *"
                type="tel"
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="Nhập số điện thoại"
              />

              <MemoizedTextarea
                id="address"
                label="Địa chỉ nhận hàng *"
                value={formData.address}
                onChange={handleAddressChange}
                placeholder="Nhập địa chỉ chi tiết để nhận hàng"
              />
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