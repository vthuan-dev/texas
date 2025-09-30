"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const newsArticles = [
  {
    id: 1,
    title: "KHAI TRƯƠNG TEXAS CHICKEN SORA GARDEN",
    excerpt: "Chào mừng nhà hàng Texas Chicken mới tại Sora Garden với không gian hiện đại và thực đơn phong phú.",
    image: "https://images.unsplash.com/photo-1588560107833-167198a53677?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjByZXN0YXVyYW50JTIwb3BlbmluZ3xlbnwxfHx8fDE3NTkxMjg0MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "15/01/2025"
  },
  {
    id: 2,
    title: "RA MẮT THỰC ĐƠN MÙA XUÂN 2025",
    excerpt: "Khám phá những món ăn mới với hương vị tươi mát, đặc biệt dành cho mùa xuân năm nay.",
    image: "https://images.unsplash.com/photo-1751890893837-d43f80a5baf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlzcHklMjBmcmllZCUyMGNoaWNrZW4lMjBidXJnZXJ8ZW58MXx8fHwxNzU5MTI4MzYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "12/01/2025"
  },
  {
    id: 3,
    title: "CHƯƠNG TRÌNH ƯU ĐÃI TẾT NGUYÊN ĐÁN",
    excerpt: "Nhận ngay ưu đãi 30% cho tất cả các set gia đình trong dịp Tết Nguyên Đán 2025.",
    image: "https://images.unsplash.com/photo-1605291581926-df4bf7ee3e89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNoaWNrZW4lMjBzZXQlMjBtZWFsfGVufDF8fHx8MTc1OTEyODQyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "08/01/2025"
  },
  {
    id: 4,
    title: "TEXAS CHICKEN THAM GIA HỘI CHỢ ẨM THỰC",
    excerpt: "Đến tham quan gian hàng Texas Chicken tại hội chợ ẩm thực lớn nhất Sài Gòn.",
    image: "https://images.unsplash.com/photo-1734987942068-a1a459d65d3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGljeSUyMGNoaWNrZW4lMjB3aW5nc3xlbnwxfHx8fDE3NTkxMjgzNzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "05/01/2025"
  },
  {
    id: 5,
    title: "GIẢI THƯỞNG NHÀ HÀNG FAST-FOOD TỐT NHẤT",
    excerpt: "Texas Chicken vinh dự nhận giải thưởng 'Nhà hàng Fast-food được yêu thích nhất 2024'.",
    image: "https://images.unsplash.com/photo-1588560107833-167198a53677?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjByZXN0YXVyYW50JTIwb3BlbmluZ3xlbnwxfHx8fDE3NTkxMjg0MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "28/12/2024"
  }
];

interface NewsEventsProps {
  onNewsClick?: () => void;
  onArticleClick?: (articleId: number) => void;
}

export function NewsEvents({ onNewsClick, onArticleClick }: NewsEventsProps = {}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calculate items per view based on screen size
  const itemsPerView = 3;
  const maxIndex = Math.max(0, newsArticles.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="py-16 px-4 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl uppercase tracking-wide text-[#D42323] mb-4">
              TIN TỨC & SỰ KIỆN
            </h2>
            <div className="w-24 h-1 bg-[#FFC72C]"></div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex space-x-3 mt-6 lg:mt-0">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="bg-[#D42323] hover:bg-[#B91C1C] disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-3 rounded-full transition-all duration-200"
              aria-label="Previous articles"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className="bg-[#D42323] hover:bg-[#B91C1C] disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-3 rounded-full transition-all duration-200"
              aria-label="Next articles"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* News Slider Container */}
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              width: `${(newsArticles.length / itemsPerView) * 100}%`
            }}
          >
            {newsArticles.map((article) => (
              <div 
                key={article.id}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / newsArticles.length}%` }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md overflow-hidden h-full">
                  <CardContent className="p-0">
                    {/* Article Image */}
                    <div className="relative overflow-hidden">
                      <ImageWithFallback
                        src={article.image}
                        alt={article.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Gradient overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-white text-sm">
                            {article.excerpt}
                          </p>
                        </div>
                      </div>

                      {/* Date Badge */}
                      <div className="absolute top-3 left-3 bg-[#FFC72C] text-black px-3 py-1 rounded-full text-sm">
                        {article.date}
                      </div>
                    </div>

                    {/* Article Info */}
                    <div className="p-4 space-y-3">
                      <h3 className="text-gray-800 min-h-[3rem] line-clamp-2 group-hover:text-[#D42323] transition-colors">
                        {article.title}
                      </h3>

                      <p className="text-gray-600 text-sm line-clamp-3 group-hover:hidden transition-opacity">
                        {article.excerpt}
                      </p>

                      {/* Read More Link */}
                      <button 
                        onClick={() => onArticleClick?.(article.id)}
                        className="inline-flex items-center text-[#D42323] hover:text-[#B91C1C] transition-colors text-sm uppercase tracking-wider"
                      >
                        Đọc thêm
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={onNewsClick}
            className="inline-flex items-center text-[#D42323] hover:text-[#B91C1C] transition-colors uppercase tracking-wider"
          >
            XEM TẤT CẢ TIN TỨC
            <ChevronRight size={20} className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}