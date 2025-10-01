"use client";

import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from "lucide-react";
import { TexasChickenHeader } from "./TexasChickenHeader";
import { TexasChickenFooter } from "./TexasChickenFooter";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  slug: string;
}

interface NewsPageProps {
  onLogoClick?: () => void;
  onUserClick?: () => void;
  onMenuClick?: () => void;
  onAboutClick?: () => void;
  onRestaurantClick?: () => void;
  onOrderTrackingClick?: () => void;
  onNewsClick?: () => void;
  onLogout?: () => void;
  onArticleClick?: (articleId: number) => void;
  isLoggedIn?: boolean;
  userName?: string;
}

export function NewsPage({ 
  onLogoClick, 
  onUserClick,
  onMenuClick, 
  onAboutClick, 
  onRestaurantClick,
  onOrderTrackingClick,
  onNewsClick,
  onLogout,
  onArticleClick,
  isLoggedIn = true,
  userName = "Minh Khải"
}: NewsPageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Sample news data
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "KHAI TRƯƠNG TEXAS CHICKEN SORA GARDEN",
      excerpt: "Chào mừng nhà hàng Texas Chicken mới tại Sora Garden với không gian hiện đại và thực đơn phong phú.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwb3BlbmluZyUyMGNlcmVtb255fGVufDF8fHx8MTc1OTE2MzMwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "15/01/2025",
      slug: "khai-truong-texas-chicken-sora-garden"
    },
    {
      id: 2,
      title: "RA MẮT THỰC ĐƠN MÙA XUÂN 2025",
      excerpt: "Khám phá những món ăn mới với hương vị tươi mát, đặc biệt dành cho mùa xuân năm nay.",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHJpbmclMjBtZW51JTIwZm9vZCUyMGZyZXNofGVufDF8fHx8MTc1OTE2MzMxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "12/01/2025",
      slug: "ra-mat-thuc-don-mua-xuan-2025"
    },
    {
      id: 3,
      title: "CHƯƠNG TRÌNH ƯU ĐÃI TẾT NGUYÊN ĐÁN",
      excerpt: "Nhận ngay ưu đãi 30% cho tất cả các set gia đình trong dịp Tết Nguyên Đán 2025.",
      image: "https://images.unsplash.com/photo-1605291581926-df4bf7ee3e89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNoaWNrZW4lMjBjb21ibyUyMG1lYWwlMjBkZWxpY2lvdXN8ZW58MXx8fHwxNzU5MTYyOTE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "08/01/2025",
      slug: "chuong-trinh-uu-dai-tet-nguyen-dan"
    },
    {
      id: 4,
      title: "TEXAS CHICKEN THAM GIA HỘI CHỢ ẨM THỰC QUỐC TẾ",
      excerpt: "Tự hào đại diện cho thương hiệu gà rán Texas tại hội chợ ẩm thực quốc tế lần thứ 15.",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZmVzdGl2YWwlMjBldmVudCUyMGNvb2tpbmd8ZW58MXx8fHwxNzU5MTYzMzE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "05/01/2025",
      slug: "texas-chicken-tham-gia-hoi-cho-am-thuc-quoc-te"
    },
    {
      id: 5,
      title: "GIỚI THIỆU COMBO GIA ĐÌNH MỚI",
      excerpt: "Combo gia đình mới với 12 miếng gà rán, khoai tây chiên và 4 ly nước ngọt với giá ưu đãi.",
      image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBtZWFsJTIwZmFzdCUyMGZvb2R8ZW58MXx8fHwxNzU5MTYzMzI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "03/01/2025",
      slug: "gioi-thieu-combo-gia-dinh-moi"
    },
    {
      id: 6,
      title: "KHAI TRƯƠNG CHI NHÁNH GOLDEN PARK TOWER",
      excerpt: "Chi nhánh thứ 25 của Texas Chicken chính thức khai trương tại Golden Park Tower với nhiều ưu đãi hấp dẫn.",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjByZXN0YXVyYW50JTIwb3BlbmluZ3xlbnwxfHx8fDE3NTkxNjMzMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "28/12/2024",
      slug: "khai-truong-chi-nhanh-golden-park-tower"
    },
    {
      id: 7,
      title: "TEXAS CHICKEN ĐẠT CHỨNG NHẬN CHẤT LƯỢNG QUỐC TẾ",
      excerpt: "Tự hào thông báo Texas Chicken đã đạt được chứng nhận chất lượng quốc tế ISO 22000:2018.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJ0aWZpY2F0ZSUyMGF3YXJkJTIwcXVhbGl0eXxlbnwxfHx8fDE3NTkxNjMzMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "25/12/2024",
      slug: "texas-chicken-dat-chung-nhan-chat-luong-quoc-te"
    },
    {
      id: 8,
      title: "CHƯƠNG TRÌNH TẶNG QUÀ GIÁNG SINH",
      excerpt: "Mùa lễ hội với những món quà đặc biệt dành cho khách hàng thân thiết của Texas Chicken.",
      image: "https://images.unsplash.com/photo-1512909006721-3d6018887943?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RtYXMlMjBnaWZ0JTIwcHJvbW90aW9ufGVufDF8fHx8MTc1OTE2MzM0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "20/12/2024",
      slug: "chuong-trinh-tang-qua-giang-sinh"
    },
    {
      id: 9,
      title: "RA MẮT DỊCH VỤ GIAO HÀNG 24/7",
      excerpt: "Texas Chicken chính thức triển khai dịch vụ giao hàng 24/7 tại khu vực Thành phố Hồ Chí Minh.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpdmVyeSUyMHNlcnZpY2UlMjBmb29kfGVufDF8fHx8MTc1OTE2MzM0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "15/12/2024",
      slug: "ra-mat-dich-vu-giao-hang-24-7"
    },
    {
      id: 10,
      title: "TEXAS CHICKEN MANG ĐẾN HỘI NGHỊ ẨM THỰC ĐÔNG NAM Á",
      excerpt: "Đại diện cho Việt Nam trong hội nghị ẩm thực Đông Nam Á với những món ăn đặc trưng.",
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwZm9vZCUyMGV2ZW50fGVufDF8fHx8MTc1OTE2MzM1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "10/12/2024",
      slug: "texas-chicken-mang-den-hoi-nghi-am-thuc-dong-nam-a"
    },
    {
      id: 11,
      title: "KHAI TRƯƠNG FLAGSHIP STORE TẠI LANDMARK 81",
      excerpt: "Cửa hàng đầu tiên với thiết kế mới và trải nghiệm ẩm thực đẳng cấp tại tòa nhà cao nhất Việt Nam.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbGFnc2hpcCUyMHN0b3JlJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NTkxNjMzNTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "05/12/2024",
      slug: "khai-truong-flagship-store-tai-landmark-81"
    },
    {
      id: 12,
      title: "CHƯƠNG TRÌNH HỖ TRỢ CỘNG ĐỒNG",
      excerpt: "Texas Chicken triển khai chương trình hỗ trợ 1000 suất ăn miễn phí cho người nghèo dịp cuối năm.",
      image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBzdXBwb3J0JTIwY2hhcml0eXxlbnwxfHx8fDE3NTkxNjMzNjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "01/12/2024",
      slug: "chuong-trinh-ho-tro-cong-dong"
    }
  ];

  const totalPages = Math.ceil(newsItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = newsItems.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleArticleClick = (articleId: number) => {
    if (onArticleClick) {
      onArticleClick(articleId);
    }
  };

  const NewsCard = ({ item }: { item: NewsItem }) => (
    <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
      {/* Image with Date Badge */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <ImageWithFallback
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Date Badge */}
        <div className="absolute top-4 left-4">
          <div className="bg-[#D42323] text-white px-3 py-2 rounded-lg shadow-lg flex items-center gap-2">
            <Calendar size={14} />
            <span className="text-sm">{item.date}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 
          className="text-gray-800 mb-3 line-clamp-2 h-12 cursor-pointer hover:text-[#D42323] transition-colors duration-200"
          onClick={() => handleArticleClick(item.id)}
        >
          {item.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {item.excerpt}
        </p>

        {/* Read More Link */}
        <button
          onClick={() => handleArticleClick(item.id)}
          className="inline-flex items-center gap-2 text-[#D42323] hover:text-[#B91C1C] transition-colors duration-200 group/link"
        >
          <span className="uppercase tracking-wide">ĐỌC THÊM</span>
          <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </article>
  );

  const Pagination = () => (
    <div className="flex justify-center items-center gap-2 mt-12">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
            currentPage === page
              ? 'bg-[#D42323] text-white'
              : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <TexasChickenHeader 
        onLogoClick={onLogoClick}
        onUserClick={onUserClick}
        onMenuClick={onMenuClick}
        onAboutClick={onAboutClick}
        onRestaurantClick={onRestaurantClick}
        onOrderTrackingClick={onOrderTrackingClick}
        onNewsClick={onNewsClick}
        onLogout={onLogout}
        activeLink="TIN TỨC"
        isLoggedIn={isLoggedIn}
        userName={userName}
      />
      
      {/* Main Content */}
      <main className="flex-1 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-12">
          {/* Page Title */}
          <div className="text-center mb-8 lg:mb-12">
            <h1 className="text-gray-800 text-3xl lg:text-4xl mb-4 relative inline-block">
              TIN TỨC & SỰ KIỆN
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#D42323] rounded-full"></div>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-6">
              Cập nhật những tin tức mới nhất và sự kiện đặc biệt từ Texas Chicken
            </p>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {currentItems.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination />
        </div>
      </main>
      
      {/* Footer */}
      <TexasChickenFooter />
    </div>
  );
}