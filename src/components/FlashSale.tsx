import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ChevronLeft, ChevronRight, Clock, Flame } from "lucide-react";

interface FlashSaleItem {
  id: number;
  name: string;
  image: string;
  originalPrice: string;
  salePrice: string;
  discount: string;
  endTime: Date;
}

interface FlashSaleProps {
  onProductClick?: () => void;
}

export function FlashSale({ onProductClick }: FlashSaleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState<{ [key: number]: string }>({});

  // Sample flash sale items
  const flashSaleItems: FlashSaleItem[] = [
    {
      id: 1,
      name: "Combo 8 Miếng Gà Rán + 2 Burger",
      image: "https://images.unsplash.com/photo-1605291581926-df4bf7ee3e89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNoaWNrZW4lMjBjb21ibyUyMG1lYWwlMjBkZWxpY2lvdXN8ZW58MXx8fHwxNzU5MTYyOTE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      originalPrice: "289.000đ",
      salePrice: "199.000đ",
      discount: "-31%",
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 hours from now
    },
    {
      id: 2,
      name: "Cánh Gà Buffalo Cay Đặc Biệt",
      image: "https://images.unsplash.com/photo-1736952332338-44dc07283462?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlzcHklMjBjaGlja2VuJTIwd2luZ3MlMjBzcGljeXxlbnwxfHx8fDE3NTkxNjI5Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      originalPrice: "159.000đ",
      salePrice: "99.000đ",
      discount: "-38%",
      endTime: new Date(Date.now() + 1.5 * 60 * 60 * 1000) // 1.5 hours from now
    },
    {
      id: 3,
      name: "Combo Burger Gà Giòn Supreme",
      image: "https://images.unsplash.com/photo-1643111998354-07e7a780c92b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwYnVyZ2VyJTIwc2FuZHdpY2glMjBtZWFsfGVufDF8fHx8MTc1OTE2MjkzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      originalPrice: "129.000đ",
      salePrice: "89.000đ",
      discount: "-31%",
      endTime: new Date(Date.now() + 3 * 60 * 60 * 1000) // 3 hours from now
    },
    {
      id: 4,
      name: "Set 6 Miếng Gà Rán + Khoai Tây",
      image: "https://images.unsplash.com/photo-1605291581926-df4bf7ee3e89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNoaWNrZW4lMjBjb21ibyUyMG1lYWwlMjBkZWxpY2lvdXN8ZW58MXx8fHwxNzU5MTYyOTE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      originalPrice: "199.000đ",
      salePrice: "149.000đ",
      discount: "-25%",
      endTime: new Date(Date.now() + 4 * 60 * 60 * 1000) // 4 hours from now
    },
    {
      id: 5,
      name: "Combo Family Bucket 12 Miếng",
      image: "https://images.unsplash.com/photo-1605291581926-df4bf7ee3e89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNoaWNrZW4lMjBjb21ibyUyMG1lYWwlMjBkZWxpY2lvdXN8ZW58MXx8fHwxNzU5MTYyOTE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      originalPrice: "459.000đ",
      salePrice: "329.000đ",
      discount: "-28%",
      endTime: new Date(Date.now() + 5 * 60 * 60 * 1000) // 5 hours from now
    }
  ];

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft: { [key: number]: string } = {};
      
      flashSaleItems.forEach(item => {
        const now = new Date().getTime();
        const distance = item.endTime.getTime() - now;
        
        if (distance > 0) {
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          
          newTimeLeft[item.id] = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
          newTimeLeft[item.id] = "00:00:00";
        }
      });
      
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % flashSaleItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + flashSaleItems.length) % flashSaleItems.length);
  };

  const getVisibleItems = () => {
    const itemsToShow = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    const items = [];
    for (let i = 0; i < itemsToShow; i++) {
      const index = (currentIndex + i) % flashSaleItems.length;
      items.push(flashSaleItems[index]);
    }
    return items;
  };

  const FlashSaleCard = ({ item }: { item: FlashSaleItem }) => (
    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex-shrink-0 w-72 lg:w-80">
      {/* Sale Badge */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-gradient-to-r from-[#D42323] to-[#FF0000] text-white px-3 py-1 rounded-full text-xs uppercase tracking-wide shadow-lg flex items-center gap-1">
          <Flame size={12} />
          <span>SALE {item.discount}</span>
        </div>
      </div>

      {/* Product Image */}
      <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <ImageWithFallback
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Product Name */}
        <h3 className="text-gray-800 mb-4 line-clamp-2 h-12">{item.name}</h3>

        {/* Pricing */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-[#D42323] text-2xl">{item.salePrice}</span>
            <span className="text-gray-400 line-through text-lg">{item.originalPrice}</span>
          </div>
          <p className="text-green-600 text-sm">Tiết kiệm {parseInt(item.originalPrice.replace(/[^\d]/g, '')) - parseInt(item.salePrice.replace(/[^\d]/g, ''))}đ</p>
        </div>

        {/* Countdown Timer */}
        <div className="bg-gradient-to-r from-[#FFC72C]/10 to-[#FFD700]/10 rounded-xl p-3 mb-4 border border-[#FFC72C]/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#D42323]">
              <Clock size={16} />
              <span className="text-sm">Kết thúc trong:</span>
            </div>
            <div className="bg-[#D42323] text-white px-3 py-1 rounded-lg text-sm font-mono">
              {timeLeft[item.id] || "00:00:00"}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onProductClick}
          className="w-full bg-gradient-to-r from-[#D42323] to-[#B91C1C] text-white py-3 px-6 rounded-xl hover:from-[#B91C1C] hover:to-[#991B1B] transition-all duration-200 uppercase tracking-wide shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
        >
          MUA NGAY
        </button>
      </div>
    </div>
  );

  return (
    <section className="bg-white py-12 lg:py-16 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-[#FFC72C]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#D42323]/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#D42323] to-[#FF0000] text-white px-6 py-3 rounded-full mb-4">
            <Flame className="animate-pulse" size={24} />
            <span className="text-lg uppercase tracking-wide">Flash Sale</span>
            <Flame className="animate-pulse" size={24} />
          </div>
          <h2 className="text-gray-800 text-3xl lg:text-4xl mb-4">
            GIỜ VÀNG SĂN DEAL
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Chỉ có hôm nay! Giảm giá sốc lên đến 38% cho các combo yêu thích
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/90 hover:bg-gray-800 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 -translate-x-4"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/90 hover:bg-gray-800 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 translate-x-4"
          >
            <ChevronRight size={24} />
          </button>

          {/* Carousel Content */}
          <div className="overflow-hidden mx-8">
            <div className="flex gap-6 lg:gap-8 transition-transform duration-500 ease-out">
              {getVisibleItems().map((item, index) => (
                <FlashSaleCard key={`${item.id}-${currentIndex}-${index}`} item={item} />
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {flashSaleItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-[#D42323] scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8 lg:mt-12">
          <p className="text-gray-600 mb-4">
            ⚡ Nhanh tay! Số lượng có hạn - Deal sẽ kết thúc sớm nếu hết hàng ⚡
          </p>
        </div>
      </div>
    </section>
  );
}