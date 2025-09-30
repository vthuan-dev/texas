"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const slides = [
  {
    id: 1,
    title: "GÀ SỐT BƠ TỎI & THẢO MỘC",
    subtitle: "Vị ngon bùng nổ, giòn tan khó cưỡng",
    image: "https://images.unsplash.com/photo-1751890893837-d43f80a5baf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlzcHklMjBmcmllZCUyMGNoaWNrZW4lMjBidXJnZXJ8ZW58MXx8fHwxNzU5MTI4MzYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 2,
    title: "CÁnh GÀ BUFFALO CAY",
    subtitle: "Hương vị Mỹ chính hiệu, cay nồng đặc trưng",
    image: "https://images.unsplash.com/photo-1734987942068-a1a459d65d3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGljeSUyMGNoaWNrZW4lMjB3aW5nc3xlbnwxfHx8fDE3NTkxMjgzNzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 3,
    title: "COMBO GÀ TENDER ĐẶC BIỆT",
    subtitle: "Gà tender giòn rụm kết hợp khoai tây chiên",
    image: "https://images.unsplash.com/photo-1608872689366-4cbcf0c7e72c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwdGVuZGVyJTIwY29tYm98ZW58MXx8fHwxNzU5MTI4MzkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 4,
    title: "BÁNH CUỘN MEXICANA CAY",
    subtitle: "Hương vị Mexico cay nồng trong từng miếng",
    image: "https://images.unsplash.com/photo-1610903128105-752ef422a907?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwd3JhcCUyMHJvbGx8ZW58MXx8fHwxNzU5MTI4NDA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

interface HeroBannerProps {
  onProductClick?: () => void;
  onSearch?: (query: string) => void;
}

export function HeroBanner({ onProductClick, onSearch }: HeroBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <section className="relative w-full h-[500px] lg:h-[600px] overflow-hidden">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <ImageWithFallback
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center px-4 lg:px-8">
              <div className="max-w-7xl mx-auto w-full text-center space-y-8">
                {/* Hero Search Bar - Main CTA */}
                <div className="w-full max-w-md lg:max-w-lg mx-auto mb-12">
                  <form onSubmit={handleSearchSubmit} className="w-full">
                    <div className="relative flex items-center bg-white/20 backdrop-blur-md rounded-xl border border-white/30 shadow-2xl hover:shadow-3xl hover:bg-white/25 transition-all duration-300">
                      {/* Search Icon */}
                      <div className="absolute left-4 text-white/90">
                        <Search size={20} />
                      </div>
                      
                      {/* Search Input */}
                      <input
                        type="text"
                        placeholder="Tìm món ngon, Texas giao ngay!"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent text-white placeholder-white/90 pl-12 pr-24 py-3 lg:py-3.5 text-sm lg:text-base rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFC72C]/60 cursor-text hover:cursor-text"
                      />
                      
                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="absolute right-2 bg-[#D42323] hover:bg-[#B91C1C] text-white px-4 py-2 lg:py-2.5 rounded-lg transition-all duration-200 uppercase tracking-wide shadow-lg hover:shadow-xl transform hover:scale-105 text-xs"
                      >
                        TÌM KIẾM
                      </button>
                    </div>
                  </form>
                </div>

                {/* Slide Content - Positioned below search */}
                <div className="text-white space-y-6">
                  <h1 className="text-2xl lg:text-4xl uppercase tracking-wide text-[#FFC72C] drop-shadow-lg">
                    {slide.title}
                  </h1>
                  
                  <p className="text-base lg:text-lg text-gray-100 max-w-2xl mx-auto">
                    {slide.subtitle}
                  </p>

                  <Button 
                    onClick={onProductClick}
                    className="bg-[#D42323] hover:bg-[#B91C1C] text-white px-8 py-3 text-lg uppercase tracking-wider shadow-lg mt-4"
                    size="lg"
                  >
                    THỬ NGAY
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide 
                ? "bg-[#FFC72C] scale-125" 
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}