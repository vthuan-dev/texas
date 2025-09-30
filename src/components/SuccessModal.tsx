import { useState, useEffect } from "react";
import { Check } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoHome: () => void;
}

export function SuccessModal({ isOpen, onClose, onGoHome }: SuccessModalProps) {
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    onClose();
    onGoHome();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackgroundClick}
    >
      <div
        className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
            <Check size={40} className="text-white" />
          </div>
        </div>

        {/* Success Message */}
        <h2 className="text-gray-800 mb-4">ĐẶT HÀNG THÀNH CÔNG!</h2>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Cảm ơn bạn đã đặt hàng! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận đơn hàng.
        </p>

        <div className="space-y-3">
          <button
            onClick={handleClose}
            className="w-full bg-[#D42323] text-white py-3 px-6 rounded-xl hover:bg-[#B91C1C] transition-colors duration-200 uppercase tracking-wide"
          >
            VỀ TRANG CHỦ
          </button>
        </div>
      </div>
    </div>
  );
}