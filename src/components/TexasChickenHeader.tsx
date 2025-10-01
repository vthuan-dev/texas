"use client";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { User, Menu, X, Package } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { UserDropdown } from "./UserDropdown";
import texasChickenLogo from 'figma:asset/1497dac2e61f09e6b67a241ff6de72149c37a116.png';
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
  const [isMounted, setIsMounted] = useState(false);
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const userButtonRef = useRef<HTMLButtonElement>(null);

  // Check if component is mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscKey);
      // Prevent body scroll and hide scrollbar when menu is open
      document.body.classList.add('mobile-menu-open');
      document.documentElement.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
      document.documentElement.classList.remove('mobile-menu-open');
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.classList.remove('mobile-menu-open');
      document.documentElement.classList.remove('mobile-menu-open');
    };
  }, [isMobileMenuOpen]);

  
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
    
    // Calculate dropdown position
    if (userButtonRef.current) {
      const rect = userButtonRef.current.getBoundingClientRect();
      setButtonRect(rect);
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

  // Mobile Menu Component
  const MobileMenu = () => {
    if (!isMobileMenuOpen) return null;

    return (
      <div 
        className={`
          mobile-menu-overlay fixed inset-0 transition-all duration-300 ease-out
          ${isMobileMenuOpen ? 'bg-black/20 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-none'}
        `}
        style={{ zIndex: 100001, position: 'fixed' }}
      >
        {/* Backdrop */}
        <div 
          className="mobile-menu-backdrop absolute inset-0" 
          onClick={() => setIsMobileMenuOpen(false)}
          style={{ zIndex: 100001, position: 'absolute' }}
        />
        
        {/* Menu Sidebar */}
        <div className={`
          mobile-menu-sidebar absolute left-0 top-0 h-full w-80 bg-[#212121] shadow-2xl transform transition-all duration-500 ease-out
          ${isMobileMenuOpen ? 'translate-x-0 scale-100' : '-translate-x-full scale-95'}
        `}
        style={{ zIndex: 100001, position: 'absolute' }}
      >
        {/* Header logo in sidebar */}
        <div className={`
          px-4 py-4 border-b border-gray-600/50 transform transition-all duration-700 ease-out
          ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}
        `}>
          <button onClick={() => {
            onLogoClick?.();
            setIsMobileMenuOpen(false);
          }} className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200">
            <img
              src={texasChickenLogo}
              alt="Texas Chicken Logo"
              className="h-8 w-8 object-contain"
            />
            <span className="text-[#FFC72C] text-lg font-bold">TEXAS CHICKEN</span>
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col px-4 py-6 space-y-1">
          {navigationLinks.map((link, index) => (
            <button
              key={link}
              onClick={() => handleMenuClick(link)}
              className={`
                text-left px-4 py-3 rounded-lg transition-all duration-300 hover:bg-gray-700/50 hover:scale-105 hover:translate-x-2 transform
                ${activeLink === link 
                  ? 'text-[#FFC72C] bg-[#FFC72C]/10' 
                  : 'text-white hover:text-[#FFC72C]'
                }
                ${isMobileMenuOpen 
                  ? 'translate-x-0 opacity-100' 
                  : '-translate-x-8 opacity-0'
                }
              `}
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 100 + 200}ms` : '0ms'
              }}
            >
              {link}
            </button>
          ))}
        </nav>

        {/* User Actions in Mobile */}
        <div className={`
          absolute bottom-6 left-4 right-4 border-t border-gray-600/50 pt-6 transform transition-all duration-800 ease-out
          ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        `}
        style={{
          transitionDelay: isMobileMenuOpen ? '600ms' : '0ms'
        }}
        >
          {isLoggedIn ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-3 px-4 py-2 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all duration-200 hover:scale-105">
                <User size={20} className="text-[#FFC72C]" />
                <span className="text-white">{userName}</span>
              </div>
              
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOrderTrackingClick?.();
                }}
                className="w-full text-left px-4 py-3 text-white hover:text-[#FFC72C] hover:bg-gray-700/50 rounded-lg transition-all duration-200 flex items-center space-x-3 hover:scale-105 hover:translate-x-2"
              >
                <Package size={18} />
                <span>Theo dõi đơn hàng</span>
              </button>
              
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onLogout?.();
                }}
                className="w-full text-left px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-all duration-200 hover:scale-105"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onUserClick?.();
              }}
              className="w-full px-4 py-3 text-white hover:text-[#FFC72C] hover:bg-gray-700/50 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 hover:scale-105"
            >
              <User size={20} />
              <span>Đăng nhập</span>
            </button>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className={`
            absolute top-4 right-4 text-white hover:text-[#FFC72C] transition-all duration-300 p-2 rounded-full hover:bg-gray-700/30 hover:scale-110 hover:rotate-90 transform
            ${isMobileMenuOpen ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-4 opacity-0 scale-75'}
          `}
          style={{
            transitionDelay: isMobileMenuOpen ? '400ms' : '0ms'
          }}
        >
          <X size={24} />
        </button>
      </div>
    </div>
    );
  };

  return (
    <>
      <header className="w-full bg-[#212121]/95 backdrop-blur-sm sticky top-0 z-[9999] shadow-lg transition-all duration-300">
        {/* Main Header */}
        <div className="px-4 py-2 lg:px-8 lg:py-3">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Logo Section - Far Left */}
            <div className="flex items-center">
              <button 
                onClick={onLogoClick}
                className="hover:opacity-80 transition-opacity duration-200"
              >
                <img
                  src={texasChickenLogo}
                  alt="Texas Chicken Logo"
                  className="h-8 w-8 lg:h-10 lg:w-10 object-contain"
                />
              </button>
            </div>

            {/* Right Section: Navigation + User Actions */}
            <div className="flex items-center space-x-6 lg:space-x-8">
              {/* Navigation Menu - Right Side */}
              <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                {navigationLinks.map((link) => (
                  <button
                    key={link}
                    onClick={() => handleMenuClick(link)}
                    className={`relative px-3 py-2 transition-all duration-300 group ${
                      activeLink === link 
                        ? 'text-[#FFC72C]' 
                        : 'text-white hover:text-[#FFC72C]'
                    }`}
                  >
                    <span className="relative z-10">{link}</span>
                    {activeLink === link && (
                      <div className="absolute inset-0 bg-[#FFC72C]/10 rounded-lg"></div>
                    )}
                    <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#FFC72C] transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
                  </button>
                ))}
              </nav>

              {/* User Actions */}
              <div className="flex items-center space-x-3 lg:space-x-4">
                {/* User Profile - Hidden on mobile */}
                {isLoggedIn ? (
                  <div className="hidden lg:flex relative">
                    <button 
                      ref={userButtonRef}
                      className="flex items-center space-x-2 text-white hover:text-[#FFC72C] transition-colors duration-200 p-2 rounded-lg"
                      onMouseEnter={handleMouseEnterDropdown}
                      onMouseLeave={handleMouseLeaveDropdown}
                    >
                      <User size={20} className="text-[#FFC72C]" />
                      <span className="hidden sm:inline">{userName}</span>
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={onUserClick}
                    className="hidden lg:block text-white hover:text-[#FFC72C] transition-colors duration-200 p-1"
                  >
                    <User size={20} />
                  </button>
                )}

                {/* Mobile Menu Toggle Button */}
                <div className="lg:hidden">
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-white hover:text-[#FFC72C] transition-colors duration-200 p-2"
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
        </div>
      </header>

      {/* Mobile Menu Portal */}
      {isMounted && createPortal(<MobileMenu />, document.body)}

      {/* User Dropdown Portal */}
      <UserDropdown
        isVisible={showUserDropdown}
        buttonRect={buttonRect}
        onMouseEnter={handleMouseEnterDropdown}
        onMouseLeave={handleMouseLeaveDropdown}
        onOrderTracking={() => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
          setShowUserDropdown(false);
          onOrderTrackingClick?.();
        }}
        onLogout={() => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
          setShowUserDropdown(false);
          onLogout?.();
        }}
      />
    </>
  );
}