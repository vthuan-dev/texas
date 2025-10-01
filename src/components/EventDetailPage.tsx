"use client";

import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { TexasChickenHeader } from "./TexasChickenHeader";
import { TexasChickenFooter } from "./TexasChickenFooter";
import { 
  Calendar, 
  Tag, 
  Facebook, 
  Share2, 
  Link, 
  ArrowLeft,
  ArrowRight,
  ChevronRight 
} from "lucide-react";

interface EventDetailPageProps {
  onLogoClick?: () => void;
  onUserClick?: () => void;
  onMenuClick?: () => void;
  onAboutClick?: () => void;
  onRestaurantClick?: () => void;
  onOrderTrackingClick?: () => void;
  onNewsClick?: () => void;
  onLogout?: () => void;
  onBackToNews?: () => void;
  onRelatedArticleClick?: (articleId: number) => void;
  eventId?: number;
  isLoggedIn?: boolean;
  userName?: string;
}

interface RelatedArticle {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
}

// Sample event data - in real app this would come from props or API
const eventData = {
  id: 1,
  title: "KHAI TRƯƠNG TEXAS CHICKEN SORA GARDEN - ƯU ĐÃI LỚN CHO KHÁCH HÀNG ĐẦU TIÊN",
  category: "Khai trương",
  date: "15/01/2025",
  heroImage: "https://images.unsplash.com/photo-1719108749028-d5697fc17803?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNoaWNrZW4lMjByZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBtb2Rlcm58ZW58MXx8fHwxNzU5MzM2MDQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  content: {
    introduction: "Chào mừng bạn đến với sự kiện khai trương đặc biệt của Texas Chicken tại Sora Garden! Đây là cửa hàng thứ 25 của chúng tôi tại Việt Nam và chúng tôi rất tự hào mang đến cho khách hàng Hà Nội trải nghiệm ẩm thực Mỹ đích thực.",
    details: [
      {
        heading: "Thông tin sự kiện",
        content: "Sự kiện khai trương sẽ diễn ra từ ngày 15/01/2025 đến 22/01/2025 tại Texas Chicken Sora Garden - Tầng 1, TTTM Sora Garden, 201 Nguyễn Tuân, Thanh Xuân, Hà Nội."
      },
      {
        heading: "Ưu đãi đặc biệt",
        content: "100 khách hàng đầu tiên mỗi ngày sẽ được giảm 50% cho tất cả các món ăn. Ngoài ra, khách hàng mua combo từ 2 người trở lên sẽ được tặng kèm 2 ly nước ngọt miễn phí và 1 phần khoai tây chiên."
      },
      {
        heading: "Menu đặc biệt",
        content: "Chúng tôi sẽ ra mắt 3 món ăn mới độc quyền tại Sora Garden bao gồm: Gà rán Louisiana cay đặc biệt, Burger gà Texas BBQ, và Salad gà grilled thanh mát. Tất cả đều được chế biến theo công thức độc quyền từ Texas, Mỹ."
      }
    ],
    conclusion: "Đây không chỉ là dịp để thưởng thức những món ăn ngon mà còn là cơ hội để trải nghiệm không gian hiện đại, sang trọng với dịch vụ tận tâm. Hãy đến và cùng chúng tôi kỷ niệm mốc quan trọng này!"
  }
};

// Related articles data
const relatedArticles: RelatedArticle[] = [
  {
    id: 2,
    title: "Ra mắt thực đơn mùa xuân 2025",
    excerpt: "Khám phá những món ăn mới với hương vị tươi mát, đặc biệt dành cho mùa xuân này.",
    image: "https://images.unsplash.com/photo-1549274880-5f86f1ec08ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNoaWNrZW4lMjBmb29kJTIwZGVsaWNpb3VzfGVufDF8fHx8MTc1OTMzNjA0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "12/01/2025"
  },
  {
    id: 3,
    title: "Chương trình ưu đãi tết Nguyên Đán",
    excerpt: "Nhân dịp Tết Nguyên Đán 2025, Texas Chicken mang đến nhiều ưu đãi hấp dẫn.",
    image: "https://images.unsplash.com/photo-1690719189466-660b50ab5519?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXN0JTIwZm9vZCUyMHJlc3RhdXJhbnQlMjBwcm9tb3Rpb25hbCUyMGV2ZW50fGVufDF8fHx8MTc1OTMzNjA0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "08/01/2025"
  },
  {
    id: 4,
    title: "Texas Chicken mở rộng hệ thống giao hàng",
    excerpt: "Dịch vụ giao hàng tận nơi được mở rộng ra 15 quận/huyện mới tại TP.HCM và Hà Nội.",
    image: "https://images.unsplash.com/photo-1719108749028-d5697fc17803?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNoaWNrZW4lMjByZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBtb2Rlcm58ZW58MXx8fHwxNzU5MzM2MDQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "05/01/2025"
  }
];

export function EventDetailPage({
  onLogoClick,
  onUserClick,
  onMenuClick,
  onAboutClick,
  onRestaurantClick,
  onOrderTrackingClick,
  onNewsClick,
  onLogout,
  onBackToNews,
  onRelatedArticleClick,
  eventId,
  isLoggedIn,
  userName
}: EventDetailPageProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShareFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(eventData.title);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`, '_blank');
  };

  const handleShareZalo = () => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(eventData.title);
    window.open(`https://chat.zalo.me/?utm_source=zalo&utm_medium=zalo&utm_campaign=zalo&url=${url}&title=${title}`, '_blank');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleRelatedClick = (articleId: number) => {
    if (onRelatedArticleClick) {
      onRelatedArticleClick(articleId);
    }
  };

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
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 lg:py-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="mb-6 lg:mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <button 
                onClick={onLogoClick}
                className="hover:text-[#D42323] transition-colors duration-200"
              >
                Trang chủ
              </button>
              <ChevronRight className="w-4 h-4" />
              <button 
                onClick={onNewsClick}
                className="hover:text-[#D42323] transition-colors duration-200"
              >
                Tin Tức & Sự Kiện
              </button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-800 truncate">
                {eventData.title.substring(0, 50)}...
              </span>
            </div>
            
            {/* Back to News Button */}
            <button
              onClick={onBackToNews || onNewsClick}
              className="mt-4 inline-flex items-center gap-2 text-[#D42323] hover:text-[#B91C1C] transition-colors duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              <span>Quay lại danh sách tin tức</span>
            </button>
          </nav>

          {/* Article Header */}
          <header className="mb-8 lg:mb-12">
            <h1 className="text-gray-800 text-2xl lg:text-4xl xl:text-5xl mb-6 leading-tight">
              {eventData.title}
            </h1>
            
            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D42323]" />
                <span>Ngày đăng: {eventData.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#D42323]" />
                <span>Chuyên mục: {eventData.category}</span>
              </div>
            </div>
          </header>

          {/* Hero Image */}
          <div className="mb-8 lg:mb-12">
            <div className="aspect-[16/9] lg:aspect-[21/9] rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src={eventData.heroImage}
                alt={eventData.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Article Body */}
          <article className="mb-12 lg:mb-16">
            <div className="max-w-3xl mx-auto">
              
              {/* Introduction */}
              <div className="mb-8">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {eventData.content.introduction}
                </p>
              </div>

              {/* Content Sections */}
              {eventData.content.details.map((section, index) => (
                <div key={index} className="mb-8">
                  <h2 className="text-gray-800 text-xl lg:text-2xl mb-4">
                    {section.heading}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}

              {/* Conclusion */}
              <div className="mt-8 p-6 bg-gray-50 rounded-xl border-l-4 border-[#D42323]">
                <p className="text-gray-700 leading-relaxed italic">
                  {eventData.content.conclusion}
                </p>
              </div>
            </div>
          </article>

          {/* Social Sharing Section */}
          <div className="mb-12 lg:mb-16">
            <div className="max-w-3xl mx-auto">
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-gray-800 mb-4">Chia sẻ bài viết</h3>
                <div className="flex items-center gap-4">
                  
                  {/* Facebook Share */}
                  <button
                    onClick={handleShareFacebook}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-colors duration-200"
                  >
                    <Facebook className="w-4 h-4" />
                    <span className="hidden sm:inline">Facebook</span>
                  </button>

                  {/* Zalo Share */}
                  <button
                    onClick={handleShareZalo}
                    className="flex items-center gap-2 px-4 py-2 bg-[#0088FF] text-white rounded-lg hover:bg-[#0066CC] transition-colors duration-200"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Zalo</span>
                  </button>

                  {/* Copy Link */}
                  <button
                    onClick={handleCopyLink}
                    className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-all duration-200 ${
                      copiedLink 
                        ? 'bg-green-100 border-green-300 text-green-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Link className="w-4 h-4" />
                    <span className="hidden sm:inline">
                      {copiedLink ? 'Đã sao chép!' : 'Sao chép link'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Articles Section */}
          <section className="mb-8">
            <div className="max-w-7xl mx-auto">
              <div className="border-t border-gray-200 pt-12">
                <h2 className="text-gray-800 text-2xl lg:text-3xl mb-8 text-center">
                  Bạn cũng sẽ thích
                </h2>
                
                {/* Related Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {relatedArticles.map((article) => (
                    <article 
                      key={article.id}
                      onClick={() => handleRelatedClick(article.id)}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
                    >
                      {/* Image with Date Badge */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                        <ImageWithFallback
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Date Badge */}
                        <div className="absolute top-4 left-4">
                          <div className="bg-[#D42323] text-white px-3 py-2 rounded-lg shadow-lg flex items-center gap-2">
                            <Calendar size={14} />
                            <span className="text-sm">{article.date}</span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Title */}
                        <h3 className="text-gray-800 mb-3 line-clamp-2 h-12 hover:text-[#D42323] transition-colors duration-200">
                          {article.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                          {article.excerpt}
                        </p>

                        {/* Read More Link */}
                        <div className="inline-flex items-center gap-2 text-[#D42323] hover:text-[#B91C1C] transition-colors duration-200 group/link">
                          <span className="uppercase tracking-wide text-sm">ĐỌC THÊM</span>
                          <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform duration-200" />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      {/* Footer */}
      <TexasChickenFooter />
    </div>
  );
}