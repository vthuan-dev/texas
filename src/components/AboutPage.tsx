"use client";

import { ImageWithFallback } from "./figma/ImageWithFallback";

interface AboutPageProps {
  onBackToHome?: () => void;
}

export function AboutPage({ onBackToHome }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-[#212121] flex flex-col">
      {/* Main Content */}
      <main className="flex-1 py-8 lg:py-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-white mb-4">VỀ TEXAS CHICKEN</h1>
            <div className="w-20 h-1 bg-[#FFC72C] mx-auto rounded mb-8"></div>
            <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Từ năm 1976, Texas Chicken đã mang đến cho khách hàng những miếng gà rán giòn tan, 
              thơm ngon với công thức gia vị bí mật được truyền từ thế hệ này sang thế hệ khác.
            </p>
          </div>

          {/* Story Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <ImageWithFallback
                src="https://aeonmall-hadong.com.vn/wp-content/uploads/2019/08/dsc00970-750x468.jpg"
                alt="Texas Chicken History"
                className="w-full h-80 object-cover rounded-2xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-white">CÂU CHUYỆN CỦA CHÚNG TÔI</h2>
              <p className="text-gray-300 leading-relaxed">
                Texas Chicken bắt đầu từ một giấc mơ đơn giản: tạo ra những miếng gà rán ngon nhất thế giới. 
                Với hơn 45 năm kinh nghiệm, chúng tôi đã phát triển từ một cửa hàng nhỏ ở Texas thành 
                chuỗi nhà hàng quốc tế với hơn 1,700 cửa hàng trên toàn thế giới.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Tại Việt Nam, Texas Chicken cam kết mang đến trải nghiệm ẩm thực tuyệt vời với 
                nguyên liệu tươi ngon, chất lượng cao và dịch vụ tận tâm.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-[#2A2A2A] rounded-3xl p-8 lg:p-12 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-white mb-4">GIÁ TRỊ CỐT LÕI</h2>
              <div className="w-20 h-1 bg-[#D42323] mx-auto rounded"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FFC72C] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-[#212121] text-2xl">🌟</span>
                </div>
                <h3 className="text-white mb-4">CHẤT LƯỢNG</h3>
                <p className="text-gray-300">
                  Chúng tôi không bao giờ thỏa hiệp về chất lượng. Mỗi miếng gà đều được chế biến 
                  theo tiêu chuẩn cao nhất.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#D42323] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl">❤️</span>
                </div>
                <h3 className="text-white mb-4">NIỀM ĐAM MÊ</h3>
                <p className="text-gray-300">
                  Niềm đam mê với ẩm thực là động lực thúc đẩy chúng tôi không ngừng sáng tạo 
                  và cải tiến sản phẩm.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FFC72C] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-[#212121] text-2xl">🤝</span>
                </div>
                <h3 className="text-white mb-4">PHỤC VỤ</h3>
                <p className="text-gray-300">
                  Khách hàng là trung tâm của mọi hoạt động. Chúng tôi luôn nỗ lực mang đến 
                  trải nghiệm tốt nhất.
                </p>
              </div>
            </div>
          </div>

          {/* Restaurant Experience */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 space-y-6">
              <h2 className="text-white">TRẢI NGHIỆM TEXAS CHICKEN</h2>
              <p className="text-gray-300 leading-relaxed">
                Mỗi nhà hàng Texas Chicken được thiết kế để tạo nên không gian ấm cúng, 
                thân thiện cho cả gia đình. Với đội ngũ nhân viên được đào tạo chuyên nghiệp, 
                chúng tôi cam kết mang đến dịch vụ tuyệt vời.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Từ việc chọn lựa nguyên liệu đến khâu chế biến, mọi quy trình đều được 
                kiểm soát nghiêm ngặt để đảm bảo hương vị đặc trưng và an toàn thực phẩm.
              </p>
              <div className="flex space-x-4">
                <button className="bg-[#D42323] text-white px-8 py-3 rounded-xl hover:bg-[#B91C1C] transition-colors duration-200 uppercase tracking-wide">
                  TÌM CỬA HÀNG
                </button>
                <button className="border border-[#FFC72C] text-[#FFC72C] px-8 py-3 rounded-xl hover:bg-[#FFC72C] hover:text-[#212121] transition-colors duration-200 uppercase tracking-wide">
                  XEM THỰC ĐƠN
                </button>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1667388968964-4aa652df0a9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBkaW5pbmd8ZW58MXx8fHwxNzU5MDU2MTA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Texas Chicken Restaurant Interior"
                className="w-full h-80 object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}