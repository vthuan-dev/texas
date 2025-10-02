import { MapPin, Phone, Mail, Facebook, Instagram, Send, Check } from "lucide-react";
import { useState, memo } from "react";
import { motion } from "motion/react";
import { toast } from "sonner@2.0.3";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const TexasChickenFooter = memo(function TexasChickenFooter() {
  console.log('🟣 TexasChickenFooter RE-RENDER');
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const informationLinks = [
    "Về Texas Chicken",
    "Thực đơn", 
    "Tin tức",
    "Nhà hàng"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error("Vui lòng nhập email của bạn!");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Vui lòng nhập email hợp lệ!");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Show success toast
      toast.success("🎉 Đăng ký thành công!", {
        description: "Cảm ơn bạn đã đăng ký nhận thông tin ưu đãi từ Texas Chicken!",
        duration: 4000,
      });

      // Reset form after 2 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setEmail("");
      }, 2000);
    }, 1500);
  };

  return (
    <footer className="w-full bg-[#212121] text-white">
      {/* Main Footer Content */}
      <div className="px-4 py-12 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* 4-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Column 1: Texas Chicken Vietnam */}
            <div className="space-y-6">
              <h3 className="uppercase tracking-wide mb-4">
                <span className="text-[#FFC72C]">TEXAS</span>
                <span className="ml-2">CHICKEN</span>
                <span className="block mt-1 text-gray-300">VIETNAM</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin size={20} className="text-[#FFC72C] mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300 leading-relaxed">
                    123 Đường Nguyễn Huệ, Quận 1<br />
                    Thành phố Hồ Chí Minh, Việt Nam
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone size={20} className="text-[#FFC72C] flex-shrink-0" />
                  <p className="text-gray-300">1900 1234</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail size={20} className="text-[#FFC72C] flex-shrink-0" />
                  <p className="text-gray-300">info@texaschicken.vn</p>
                </div>
              </div>
            </div>

            {/* Column 2: Thông Tin (Information) */}
            <div className="space-y-6">
              <h3 className="uppercase tracking-wide text-white">Thông Tin</h3>
              <div className="space-y-3">
                {informationLinks.map((link, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block text-gray-300 hover:text-[#FFC72C] transition-colors duration-200"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 3: Kết Nối Với Texas Chicken */}
            <div className="space-y-6">
              <h3 className="uppercase tracking-wide text-white">Kết Nối Với Texas Chicken</h3>
              <div className="space-y-4">
                <a
                  href="#"
                  className="block text-gray-300 hover:text-[#FFC72C] transition-colors duration-200"
                >
                  Liên hệ
                </a>
                
                {/* Social Media Icons */}
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-gray-300 hover:text-[#FFC72C] transition-colors duration-200"
                    aria-label="Facebook"
                  >
                    <Facebook size={24} />
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-[#FFC72C] transition-colors duration-200"
                    aria-label="Instagram"
                  >
                    <Instagram size={24} />
                  </a>
                </div>
              </div>
            </div>

            {/* Column 4: Newsletter Signup */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <h3 className="uppercase tracking-wide text-white">Đăng ký nhận thông tin ưu đãi</h3>
                {isSuccess && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <Check size={14} className="text-white" />
                  </motion.div>
                )}
              </div>
              
              <div className="space-y-4">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="email"
                      placeholder="Email của bạn"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting || isSuccess}
                      className={`flex-1 bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-[#FFC72C] focus:ring-[#FFC72C] transition-all duration-300 ${
                        isSuccess ? 'border-green-500 bg-green-900/20' : ''
                      }`}
                    />
                    <Button 
                      type="submit"
                      disabled={isSubmitting || isSuccess}
                      className={`px-6 whitespace-nowrap transition-all duration-300 ${
                        isSuccess 
                          ? 'bg-green-500 hover:bg-green-600 text-white' 
                          : 'bg-[#FFC72C] hover:bg-[#E6B329] text-black'
                      }`}
                    >
                      <motion.div
                        animate={isSubmitting ? { rotate: 360 } : { rotate: 0 }}
                        transition={{ duration: 1, repeat: isSubmitting ? Infinity : 0, ease: "linear" }}
                        className="mr-2"
                      >
                        {isSuccess ? (
                          <Check size={16} />
                        ) : (
                          <Send size={16} />
                        )}
                      </motion.div>
                      {isSubmitting ? 'Đang gửi...' : isSuccess ? 'Thành công!' : 'Gửi'}
                    </Button>
                  </div>
                </form>
                
                {isSuccess && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-400 text-sm"
                  >
                    ✨ Cảm ơn bạn đã đăng ký! Chúng tôi sẽ gửi những ưu đãi tuyệt vời nhất đến email của bạn.
                  </motion.p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-600 px-4 py-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-center md:text-left">
              Copyright © 2025 Texas Chicken Vietnam
            </p>
            
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-[#FFC72C] transition-colors duration-200"
              >
                Chính sách quy định
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#FFC72C] transition-colors duration-200"
              >
                Chính sách bảo mật
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});