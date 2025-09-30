"use client";
import React, { useState, useRef, useEffect } from "react";
import { User, Menu, X, Package } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
// Logo from Texas Chicken Vietnam

interface TexasChickenHeaderProps {
  onUserClick?: () => void;
  onLogoClick?: () => void;
  onMenuClick?: () => void;
  onAboutClick?: () => void;
  onRestaurantClick?: () => void;
  onOrderTrackingClick?: () => void;
  onNewsClick?: () => void;
  onLogout?: () => void;
  activeLink?: string;
  isLoggedIn?: boolean;
  userName?: string;
}

export function TexasChickenHeader({ onUserClick, onLogoClick, onMenuClick, onAboutClick, onRestaurantClick, onOrderTrackingClick, onNewsClick, onLogout, activeLink, isLoggedIn, userName }: TexasChickenHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll shadow + cleanup timeout on unmount
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (timeoutRef.current) { 
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  
  const navigationLinks = [
    "TRANG CHỦ",
    "THỰC ĐƠN", 
    "TIN TỨC",
    "NHÀ HÀNG",
    "VỀ TEXAS CHICKEN"
  ];

  const handleMenuClick = (link: string) => {
    if (link === "THỰC ĐƠN" && onMenuClick) {
      onMenuClick();
    } else if (link === "TRANG CHỦ" && onLogoClick) {
      onLogoClick();
    } else if (link === "VỀ TEXAS CHICKEN" && onAboutClick) {
      onAboutClick();
    } else if (link === "TIN TỨC" && onNewsClick) {
      onNewsClick();
    } else if (link === "NHÀ HÀNG" && onRestaurantClick) {
      onRestaurantClick();
    }
    setIsMobileMenuOpen(false); // Close mobile menu after clicking
  };

  const handleMouseEnterDropdown = () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setShowUserDropdown(true);
  };

  const handleMouseLeaveDropdown = () => {
    // Set timeout to close dropdown after 1.5 seconds
    timeoutRef.current = setTimeout(() => {
      setShowUserDropdown(false);
      timeoutRef.current = null;
    }, 1500);
  };



  return (
    <header className={`w-full sticky top-0 z-[9999] bg-[#212121] ${scrolled ? 'shadow-md/50 shadow-black/20 backdrop-blur-sm' : ''}`}>
      {/* Main Header */}
      <div className="px-4 py-2 lg:px-8 lg:py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo Section - Far Left */}
        <div className="flex items-center">
          <button 
            onClick={onLogoClick}
            className="focus:outline-none focus:ring-2 focus:ring-[#FFC72C] focus:ring-offset-2 focus:ring-offset-[#212121] rounded"
          >
            <ImageWithFallback
              src="https://texaschickenvn.com/vnt_upload/weblink/logo.png"
              alt="Texas Chicken Logo"
              className="h-12 lg:h-14 object-contain"
            />
          </button>
        </div>



          {/* Right Side - Navigation Links and Action Icons */}
          <div className="flex items-center space-x-4 lg:space-x-8 relative">
            {/* Navigation Links - Hidden on mobile, shown on desktop */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => handleMenuClick(link)}
                  className={`text-white hover:text-[#FFC72C] transition-all duration-300 uppercase tracking-wider relative group ${
                    activeLink === link ? 'text-[#FFC72C]' : ''
                  }`}
                >
                  {link}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-[#FFC72C] transition-all duration-200 group-hover:w-full ${
                    activeLink === link ? 'w-full' : 'w-0'
                  }`}></span>
                </button>
              ))}
            </nav>

            {/* Action Icons */}
            <div className="flex items-center space-x-3 lg:space-x-4">
              {/* Language Selector removed */}



              {/* User Profile - Hidden on mobile */}
              {isLoggedIn ? (
                <div className="hidden lg:flex relative">
                  <button 
                    className="flex items-center space-x-2 text-white hover:text-[#FFC72C] transition-colors duration-200 p-2 rounded-lg"
                    onMouseEnter={handleMouseEnterDropdown}
                    onMouseLeave={handleMouseLeaveDropdown}
                  >
                    <User size={20} className="text-[#FFC72C]" />
                    <span className="hidden sm:inline">{userName}</span>
                  </button>
                  
                  {/* User Dropdown with Logout */}
                  {showUserDropdown && (
                    <div 
                      className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                      onMouseEnter={handleMouseEnterDropdown}
                      onMouseLeave={handleMouseLeaveDropdown}
                    >
                      <button
                        onClick={() => {
                          // Clear any pending timeout
                          if (timeoutRef.current) {
                            clearTimeout(timeoutRef.current);
                            timeoutRef.current = null;
                          }
                          setShowUserDropdown(false);
                          onOrderTrackingClick?.();
                        }}
                        className="w-full text-left px-4 py-3 text-gray-800 hover:bg-gray-50 hover:text-[#D42323] transition-colors duration-200 border-b border-gray-100"
                      >
                        Theo dõi đơn hàng
                      </button>
                      <button
                        onClick={() => {
                          // Clear any pending timeout
                          if (timeoutRef.current) {
                            clearTimeout(timeoutRef.current);
                            timeoutRef.current = null;
                          }
                          setShowUserDropdown(false);
                          onLogout?.();
                        }}
                        className="w-full text-left px-4 py-3 text-gray-800 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 rounded-b-lg"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={onUserClick}
                  className="hidden lg:block text-white hover:text-[#FFC72C] transition-colors duration-200 p-1"
                >
                  <User size={20} />
                </button>
              )}

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-white hover:text-[#FFC72C] transition-colors duration-200 p-1"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X size={24} />
                ) : (
                  <Menu size={24} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay & Menu */}
      <div className={`lg:hidden fixed inset-0 z-[9998] transition-opacity duration-300 ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black/20 backdrop-blur-sm" 
          onClick={() => setIsMobileMenuOpen(false)} 
        />
        
        {/* Sidebar Menu */}
        <div className={`absolute top-0 left-0 h-full w-80 bg-[#212121] shadow-xl transition-transform duration-300 ease-in-out flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        {/* Header logo in sidebar */}
        <div className="px-4 py-4 border-b border-gray-600/50">
          <ImageWithFallback
            src="https://texaschickenvn.com/vnt_upload/weblink/logo.png"
            alt="Texas Chicken Logo"
            className="h-12 object-contain"
          />
        </div>

        <nav className="px-4 py-6 flex-1 overflow-y-auto">
          <div className="flex flex-col space-y-2">
            {navigationLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => handleMenuClick(link)}
                className={`text-white hover:text-[#FFC72C] hover:bg-gray-700/50 transition-all duration-200 uppercase tracking-wider py-4 px-3 w-full text-left rounded-lg ${
                  activeLink === link ? 'text-[#FFC72C] bg-gray-700/50' : ''
                }`}
              >
                {link}
              </button>
            ))}
            
            {/* Mobile Action Items */}
            <div className="pt-4 border-t border-gray-600/50 mt-4 space-y-2">

              
              {/* Order Tracking for Mobile */}
              {isLoggedIn && (
                <button 
                  onClick={() => {
                    onOrderTrackingClick?.();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 text-white hover:text-[#FFC72C] hover:bg-gray-700/50 transition-all duration-200 py-4 px-3 w-full rounded-lg"
                >
                  <Package size={20} />
                  <span>THEO DÕI ĐƠN HÀNG</span>
                </button>
              )}
              
              {/* User Profile for Mobile */}
              {isLoggedIn ? (
                <>
                  <button 
                    onClick={() => {
                      onOrderTrackingClick?.();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 text-white hover:text-[#FFC72C] hover:bg-gray-700/50 transition-all duration-200 py-4 px-3 w-full rounded-lg"
                  >
                    <User size={20} className="text-[#FFC72C]" />
                    <span>{userName}</span>
                  </button>
                  <button 
                    onClick={() => {
                      onLogout?.();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 text-white hover:text-red-400 hover:bg-red-900/20 transition-all duration-200 py-4 px-3 w-full rounded-lg"
                  >
                    <X size={20} />
                    <span>ĐĂNG XUẤT</span>
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => {
                    onUserClick?.();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 text-white hover:text-[#FFC72C] hover:bg-gray-700/50 transition-all duration-200 py-4 px-3 w-full rounded-lg"
                >
                  <User size={20} />
                  <span>ĐĂNG NHẬP</span>
                </button>
              )}
              
              {/* Language button removed on mobile */}
            </div>
          </div>
        </nav>
        </div>
      </div>


    </header>
  );
}