"use client";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import texasChickenLogo from 'figma:asset/eb27f44b097ccc27b26512d26c561dfedb0be49c.png';

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#212121] text-white relative">
      {/* Hero Section */}
      <section className="relative pt-20 lg:pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:pl-20">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-[#FFC72C]">TEXAS</span>
                <br />
                <span className="text-white">CHICKEN</span>
              </h1>
              <p className="text-lg lg:text-xl mb-8 text-gray-300 leading-relaxed">
                Trải nghiệm hương vị gà rán Louisiana đích thực với công thức bí mật truyền thống từ Texas, Mỹ.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#FFC72C] text-black px-8 py-4 rounded-lg hover:bg-[#e6b329] transition-colors duration-200 text-lg font-semibold">
                  ĐẶT HÀNG NGAY
                </button>
                <button className="border-2 border-[#D42323] text-[#D42323] px-8 py-4 rounded-lg hover:bg-[#D42323] hover:text-white transition-colors duration-200 text-lg font-semibold">
                  XEM THỰC ĐƠN
                </button>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1600555379765-f82335a7b1b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNoaWNrZW4lMjB3aW5ncyUyMGZvb2R8ZW58MXx8fHwxNzU5MzM4NDA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Texas Chicken Delicious Food"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-[#D42323] text-white px-6 py-3 rounded-full shadow-lg rotate-12">
                <span className="font-bold text-sm">HOT & SPICY</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Features Section */}
      <section className="py-16 bg-[#1a1a1a]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#FFC72C] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍗</span>
              </div>
              <h3 className="text-xl font-bold mb-2">CÔNG THỨC BÍ MẬT</h3>
              <p className="text-gray-400">Gia vị Louisiana truyền thống từ Texas, Mỹ</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#FFC72C] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-bold mb-2">GIAO HÀNG NHANH</h3>
              <p className="text-gray-400">Giao hàng trong vòng 30 phút</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#FFC72C] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-bold mb-2">CHẤT LƯỢNG ĐỈNH CAO</h3>
              <p className="text-gray-400">Nguyên liệu tươi ngon, chế biến theo tiêu chuẩn quốc tế</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}