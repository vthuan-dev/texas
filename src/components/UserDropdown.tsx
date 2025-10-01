"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface UserDropdownProps {
  isVisible: boolean;
  buttonRect: DOMRect | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onOrderTracking: () => void;
  onLogout: () => void;
}

export function UserDropdown({ 
  isVisible, 
  buttonRect, 
  onMouseEnter, 
  onMouseLeave, 
  onOrderTracking, 
  onLogout 
}: UserDropdownProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isVisible || !buttonRect) {
    return null;
  }

  const dropdownStyle = {
    position: 'fixed' as const,
    top: buttonRect.bottom + window.scrollY + 8,
    right: window.innerWidth - buttonRect.right,
    zIndex: 9999999,
    transform: 'translateZ(0)',
    isolation: 'isolate' as const,
  };

  const dropdownContent = (
    <div 
      className="w-48 bg-white border border-gray-200 rounded-lg shadow-xl"
      style={dropdownStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        onClick={onOrderTracking}
        className="w-full text-left px-4 py-3 text-gray-800 hover:bg-gray-50 hover:text-[#D42323] transition-colors duration-200 border-b border-gray-100"
      >
        Theo dõi đơn hàng
      </button>
      
      <button
        onClick={onLogout}
        className="w-full text-left px-4 py-3 text-gray-800 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 rounded-b-lg"
      >
        Đăng xuất
      </button>
    </div>
  );

  return createPortal(dropdownContent, document.body);
}