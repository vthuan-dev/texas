import React, { useState } from "react";
import { TexasChickenHeader } from "./TexasChickenHeader";
import { TexasChickenFooter } from "./TexasChickenFooter";
import { Breadcrumb } from "./Breadcrumb";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Minus, Plus, ChevronLeft, ChevronRight, X, Star } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
const productImage = "https://images.unsplash.com/photo-1707750795395-f9a4cababde9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80";

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  description: string[];
}

interface CheckoutModalProps {
  quantity: number;
  formattedSubtotal: string;
  formattedTotal: string;
  voucherDiscount: number;
  formattedDiscount: string;
  currentProduct: Product;
  formData: { fullName: string; phone: string; address: string };
  onInputChange: (field: string, value: string) => void;
  voucherCode: string;
  setVoucherCode: (value: string) => void;
  voucherMessage: string;
  voucherStatus: "idle" | "success" | "error";
  onVoucherApply: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  preventEnterSubmit: (e: React.KeyboardEvent<HTMLFormElement>) => void;
}

const CheckoutModalComponent: React.FC<CheckoutModalProps> = ({
  quantity,
  formattedSubtotal,
  formattedTotal,
  voucherDiscount,
  formattedDiscount,
  currentProduct,
  formData,
  onInputChange,
  voucherCode,
  setVoucherCode,
  voucherMessage,
  voucherStatus,
  onVoucherApply,
  onSubmit,
  onClose,
  preventEnterSubmit,
}) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[95vh] overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8B7355] to-[#A0826D] px-8 py-6 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-white hover:bg-white/20 rounded-full transition-colors duration-200"
          >
            <X size={24} />
          </button>
          <h1 className="text-white text-2xl text-center pr-12">THÔNG TIN GIAO HÀNG</h1>
        </div>

        <div className="overflow-y-auto max-h-[calc(95vh-120px)] px-8 py-6">
          {/* Order Summary */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-800 text-xl">Tóm tắt đơn hàng</h2>
              <div className="bg-[#D42323] text-white px-3 py-1 rounded-full text-sm">
                {quantity} món
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <span className="text-gray-800">{currentProduct.name}</span>
                  <div className="text-gray-500 text-sm mt-1">Số lượng: {quantity}</div>
                </div>
                <span className="text-gray-800 ml-4">{formattedSubtotal}</span>
              </div>
              {voucherDiscount > 0 && (
                <div className="flex justify-between items-center text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                  <span>Voucher giảm giá</span>
                  <span>-{formattedDiscount}</span>
                </div>
              )}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-800 text-lg">Tổng thanh toán</span>
                  <span className="text-[#D42323] text-2xl">{formattedTotal}</span>
                </div>
                <p className="text-gray-500 text-sm mt-1">Đã bao gồm phí giao hàng</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} onKeyDown={preventEnterSubmit} className="space-y-8">
            {/* Customer Information */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-gray-800 text-lg mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-[#8B7355] text-white rounded-full flex items-center justify-center text-sm">1</div>
                Thông tin khách hàng
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName" className="text-gray-700 mb-3 block">
                    Họ và tên *
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => onInputChange('fullName', e.target.value)}
                    className="bg-gray-50 border-gray-200 focus:border-[#8B7355] focus:ring-[#8B7355] rounded-xl h-12"
                    placeholder="Nhập họ và tên của bạn"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-gray-700 mb-3 block">
                    Số điện thoại *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => onInputChange('phone', e.target.value)}
                    className="bg-gray-50 border-gray-200 focus:border-[#8B7355] focus:ring-[#8B7355] rounded-xl h-12"
                    placeholder="Nhập số điện thoại"
                    required
                  />
                </div>
              </div>
              <div className="mt-6">
                <Label htmlFor="address" className="text-gray-700 mb-3 block">
                  Địa chỉ nhận hàng *
                </Label>
                <textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => onInputChange('address', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:border-[#8B7355] focus:ring-2 focus:ring-[#8B7355] focus:ring-opacity-20 transition-colors duration-200 resize-none"
                  rows={3}
                  placeholder="Nhập địa chỉ chi tiết để nhận hàng"
                  required
                />
              </div>
            </div>

            {/* Voucher Section */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-gray-800 text-lg mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-[#FFC72C] text-gray-800 rounded-full flex items-center justify-center text-sm">2</div>
                Mã giảm giá
              </h3>
              <div className="flex gap-3">
                <Input
                  type="text"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  className="flex-1 bg-gray-50 border-gray-200 focus:border-[#8B7355] focus:ring-[#8B7355] rounded-xl h-12"
                  placeholder="Nhập mã voucher"
                />
                <button
                  type="button"
                  onClick={onVoucherApply}
                  className="px-6 py-3 bg-gradient-to-r from-[#FFC72C] to-[#FFD700] text-gray-800 rounded-xl hover:from-[#FFD700] hover:to-[#FFC72C] transition-all duration-200 whitespace-nowrap"
                >
                  Áp dụng
                </button>
              </div>
              {voucherMessage && (
                <div className={`mt-4 p-3 rounded-lg text-sm ${
                  voucherStatus === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {voucherMessage}
                </div>
              )}
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-700 text-sm">
                  💡 Mã voucher có sẵn: <span className="font-mono">TEXAS20</span>, <span className="font-mono">COMBO30</span>, <span className="font-mono">NEWUSER</span>, <span className="font-mono">FLASH50</span>
                </p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-gray-800 text-lg mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-[#8B7355] text-white rounded-full flex items-center justify-center text-sm">3</div>
                Phương thức thanh toán
              </h3>
              <div className="grid gap-4">
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-[#8B7355] to-[#A0826D] text-white rounded-xl shadow-lg">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-[#8B7355] rounded-full"></div>
                  </div>
                  <div>
                    <span className="block">Thanh toán khi nhận hàng</span>
                    <span className="text-sm opacity-90">Tiền mặt</span>
                  </div>
                </div>
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-4 text-center">
                  <p className="text-gray-500 text-sm">Phương thức thanh toán khác sẽ sớm được cập nhật</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="sticky bottom-0 bg-white pt-6 border-t">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#8B7355] to-[#A0826D] text-white py-4 px-8 rounded-2xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 uppercase tracking-wide text-lg relative overflow-hidden group"
              >
                <span className="relative z-10">HOÀN TẤT ĐẶT HÀNG - {formattedTotal}</span>
                <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              <p className="text-gray-500 text-sm text-center mt-4">* Các thông tin có dấu sao là bắt buộc phải điền</p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

const relatedProducts: Product[] = [
  {
    id: 1,
    name: "Combo 08 Miếng Gà Rán Truyền Thống",
    price: "469.000đ",
    originalPrice: "523.000đ",
    image: "https://images.unsplash.com/photo-1605291581926-df4bf7ee3e89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpY2lvdXMlMjBmcmllZCUyMGNoaWNrZW4lMjBjb21ibyUyMG1lYWx8ZW58MXx8fHwxNzU5MTQ3NzY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: ["8 miếng gà rán truyền thống", "2 bánh mì", "2 nước ngọt"]
  },
  {
    id: 2,
    name: "Combo 06 Miếng Gà Rán Truyền Thống",
    price: "359.000đ",
    originalPrice: "457.000đ",
    image: "https://images.unsplash.com/photo-1605291581926-df4bf7ee3e89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhkZWxpY2lvdXMlMjBmcmllZCUyMGNoaWNrZW4lMjBjb21ibyUyMG1lYWx8ZW58MXx8fHwxNzU5MTQ3NzY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: ["6 miếng gà rán truyền thống", "2 bánh mì", "2 nước ngọt"]
  },
  {
    id: 3,
    name: "Burger Gà Giòn Đặc Biệt",
    price: "89.000đ",
    image: "https://images.unsplash.com/photo-1707750795395-f9a4cababde9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwYnVyZ2VyJTIwc2FuZHdpY2h8ZW58MXx8fHwxNzU5MTQ2MDM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: ["Burger gà giòn đặc biệt", "Khoai tây chiên", "Nước ngọt"]
  },
  {
    id: 4,
    name: "Bánh Cuộn Gà Giòn",
    price: "65.000đ",
    image: "https://images.unsplash.com/photo-1610903128105-752ef422a907?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhjaGlja2VuJTIwd3JhcCUyMHJvbGwlMjBmb29kfGVufDF8fHx8MTc1OTE0NjA0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: ["Bánh cuộn gà giòn", "Salad tươi", "Nước sốt đặc biệt"]
  }
];

const currentProduct: Product = {
  id: 100,
  name: "COMBO BURGER TEX SUPREME",
  price: "89.000đ",
  originalPrice: "105.000đ",
  image: productImage,
  description: [
    "1 Burger Tex Supreme (lựa chọn vị cay/ không cay)",
    "1 Món ăn kèm tiêu chuẩn lúy chọn (Bắp cải trộn/ Khoai tây nghiền/ Khoai tây chiên)",
    "1 Nước ngọt",
    "1 Tương ớt"
  ]
};

interface ProductDetailPageProps {
  onBackToHome?: () => void;
  onBackToMenu?: () => void;
  onOrderComplete?: () => void;
  onUserClick?: () => void;
  onLogoClick?: () => void;
  onMenuClick?: () => void;
  onAboutClick?: () => void;
  onRestaurantClick?: () => void;
  onOrderTrackingClick?: () => void;
  onNewsClick?: () => void;
  onLogout?: () => void;
  isLoggedIn?: boolean;
  userName?: string;
}

export function ProductDetailPage({ 
  onBackToHome, 
  onBackToMenu, 
  onOrderComplete,
  onUserClick,
  onLogoClick,
  onMenuClick,
  onAboutClick,
  onRestaurantClick,
  onOrderTrackingClick,
  onNewsClick,
  onLogout,
  isLoggedIn,
  userName
}: ProductDetailPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  
  // Review states
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: ""
  });
  
  // Voucher states
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [voucherMessage, setVoucherMessage] = useState("");
  const [voucherStatus, setVoucherStatus] = useState<"idle" | "success" | "error">("idle");

  // Sample reviews data
  const sampleReviews = [
    {
      id: 1,
      userName: "Minh Khải",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdmF0YXIlMjBtYW58ZW58MXx8fHwxNzU5MTUwNTAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "28/09/2025",
      rating: 5,
      comment: "Burger rất ngon, gà giòn tan và nước sốt đậm đà. Sẽ quay lại thử những món khác!"
    },
    {
      id: 2,
      userName: "Thanh Hương",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9d55c83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdmF0YXIlMjB3b21hbnxlbnwxfHx8fDE3NTkxNTA1MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "27/09/2025",
      rating: 4,
      comment: "Combo rất đáng giá tiền. Phần ăn vừa đủ, vị rất ổn. Chỉ có điều chờ hơi lâu."
    },
    {
      id: 3,
      userName: "Việt Anh",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdmF0YXIlMjBtYW4lMjAyfGVufDF8fHx8MTc1OTE1MDUwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "26/09/2025",
      rating: 5,
      comment: "Lần đầu thử Texas Chicken và rất ấn tượng. Gà rán giòn rụm, burger thịt mềm. Recommend!"
    },
    {
      id: 4,
      userName: "Mai Linh",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdmF0YXIlMjB3b21hbiUyMDJ8ZW58MXx8fHwxNzU5MTUwNTAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "25/09/2025",
      rating: 4,
      comment: "Combo ngon, giá hợp lý. Khoai tây chiên giòn, nước ngọt mát lạnh. Sẽ order lại."
    }
  ];

  const breadcrumbItems = [
    { label: "Trang chủ", onClick: onBackToHome },
    { label: "Thực đơn", onClick: onBackToMenu },
    { label: "Combo Burger Tex Supreme", active: true }
  ];

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const handleBuyNow = () => {
    setShowCheckoutModal(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Close modal and trigger success
    setShowCheckoutModal(false);
    if (onOrderComplete) {
      onOrderComplete();
    }
  };

  const handleModalClose = () => {
    setShowCheckoutModal(false);
    setFormData({
      fullName: "",
      phone: "",
      address: ""
    });
  };

  // Prevent accidental form submission when pressing Enter inside inputs
  const preventEnterSubmit = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLElement;
      const tag = target.tagName.toLowerCase();
      const isTextarea = tag === "textarea";
      const isButton = tag === "button" || (target as HTMLButtonElement).type === "submit";
      if (!isTextarea && !isButton) {
        e.preventDefault();
      }
    }
  };

  // Review functions
  const handleStarClick = (starIndex: number) => {
    setRating(starIndex + 1);
    setReviewError("");
  };

  const handleStarHover = (starIndex: number) => {
    setHoveredRating(starIndex + 1);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      setReviewError("Vui lòng chọn số sao để đánh giá.");
      return;
    }

    if (!reviewComment.trim()) {
      setReviewError("Vui lòng nhập nhận xét của bạn.");
      return;
    }

    // Show success toast
    toast.success("Cảm ơn bạn đã gửi đánh giá!", {
      duration: 3000,
      position: "bottom-center",
    });

    // Reset form
    setRating(0);
    setReviewComment("");
    setReviewError("");
  };

  // Voucher functions
  const handleVoucherApply = () => {
    setVoucherStatus("idle");
    setVoucherMessage("");
    
    // Valid voucher codes
    const validVouchers = {
      "TEXAS20": { discount: 20000, message: "Giảm 20.000đ cho đơn hàng từ 80.000đ" },
      "COMBO30": { discount: 30000, message: "Giảm 30.000đ cho combo đặc biệt" },
      "NEWUSER": { discount: 15000, message: "Giảm 15.000đ cho khách hàng mới" },
      "FLASH50": { discount: 50000, message: "Flash sale - Giảm 50.000đ" }
    };

    const voucher = validVouchers[voucherCode.toUpperCase() as keyof typeof validVouchers];
    
    if (voucher) {
      const currentTotal = priceNumber * quantity;
      if (currentTotal >= voucher.discount) {
        setVoucherDiscount(voucher.discount);
        setVoucherStatus("success");
        setVoucherMessage(`Áp dụng voucher thành công! ${voucher.message}`);
      } else {
        setVoucherStatus("error");
        setVoucherMessage("Đơn hàng không đủ điều kiện áp dụng voucher này.");
      }
    } else {
      setVoucherStatus("error");
      setVoucherMessage("Mã voucher không hợp lệ hoặc đã hết hạn.");
    }
  };

  const renderStarRating = (rating: number, size: "sm" | "lg" = "sm") => {
    const starSize = size === "lg" ? 24 : 16;
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={starSize}
            className={`${
              index < rating
                ? "fill-[#FFC72C] text-[#FFC72C]"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const nextCarousel = () => {
    setCarouselIndex((prev) => (prev + 1) % relatedProducts.length);
  };

  const prevCarousel = () => {
    setCarouselIndex((prev) => (prev - 1 + relatedProducts.length) % relatedProducts.length);
  };

  const getVisibleProducts = (): Product[] => {
    const visibleCount = window.innerWidth >= 1024 ? 4 : 2;
    const products: Product[] = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (carouselIndex + i) % relatedProducts.length;
      products.push(relatedProducts[index]);
    }
    return products;
  };

  // Calculate total (remove currency symbol and dots for calculation)
  const priceNumber = parseInt(currentProduct.price.replace(/[^\d]/g, ''));
  const subtotal = priceNumber * quantity;
  const totalPrice = Math.max(0, subtotal - voucherDiscount);
  const formattedSubtotal = subtotal.toLocaleString('vi-VN') + 'đ';
  const formattedTotal = totalPrice.toLocaleString('vi-VN') + 'đ';
  const formattedDiscount = voucherDiscount.toLocaleString('vi-VN') + 'đ';

  interface ProductCardProps { product: Product }
  const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex-shrink-0 w-64 lg:w-72">
      <div className="aspect-square overflow-hidden">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-gray-800 mb-3 line-clamp-2 text-sm lg:text-base">{product.name}</h3>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-[#D42323]">{product.price}</span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-sm">{product.originalPrice}</span>
            )}
          </div>
        </div>
        <button className="w-full bg-[#D42323] text-white py-2 px-4 rounded-lg hover:bg-[#B91C1C] transition-colors duration-200 uppercase tracking-wide text-sm">
          XEM CHI TIẾT
        </button>
      </div>
    </div>
  );

  // Checkout Modal Component
  // Render helper for modal to avoid recreating component type each render
  const renderCheckoutModal = () => (
    <CheckoutModalComponent
      quantity={quantity}
      formattedSubtotal={formattedSubtotal}
      formattedTotal={formattedTotal}
      voucherDiscount={voucherDiscount}
      formattedDiscount={formattedDiscount}
      currentProduct={currentProduct}
      formData={formData}
      onInputChange={handleInputChange}
      voucherCode={voucherCode}
      setVoucherCode={setVoucherCode}
      voucherMessage={voucherMessage}
      voucherStatus={voucherStatus}
      onVoucherApply={handleVoucherApply}
      onSubmit={handleSubmit}
      onClose={handleModalClose}
      preventEnterSubmit={preventEnterSubmit}
    />
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <TexasChickenHeader 
        onLogoClick={onLogoClick || onBackToHome}
        onUserClick={onUserClick}
        onMenuClick={onMenuClick || onBackToMenu}
        onAboutClick={onAboutClick}
        onRestaurantClick={onRestaurantClick}
        onOrderTrackingClick={onOrderTrackingClick}
        onNewsClick={onNewsClick}
        onLogout={onLogout}
        isLoggedIn={isLoggedIn}
        userName={userName}
      />

      {/* Main Content with light background */}
      <main className="flex-1 bg-[#F9F9F9] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} />

          {/* Product Detail Section */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Column - Product Image */}
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6 lg:p-8">
                <div className="aspect-square flex items-center justify-center">
                  <img
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    className="w-full h-full object-contain max-w-sm mx-auto drop-shadow-xl"
                  />
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-6 right-6 w-16 h-16 bg-[#FFC72C]/10 rounded-full blur-lg"></div>
                <div className="absolute bottom-6 left-6 w-12 h-12 bg-[#D42323]/10 rounded-full blur-lg"></div>
              </div>

              {/* Right Column - Product Details */}
              <div className="p-6 lg:p-8 flex flex-col justify-center">
                {/* Product Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFC72C] to-[#FFD700] text-black px-3 py-1.5 rounded-full text-xs uppercase tracking-wide mb-4 w-fit">
                  <span className="w-1.5 h-1.5 bg-[#D42323] rounded-full"></span>
                  Combo Đặc Biệt
                </div>

                <h1 className="text-gray-800 text-2xl lg:text-3xl mb-4 leading-tight">
                  {currentProduct.name}
                </h1>
                
                {/* Price Section */}
                <div className="bg-gradient-to-r from-[#FFC72C]/10 to-[#FFD700]/10 rounded-xl p-4 mb-6">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-[#FFC72C] text-2xl lg:text-3xl tracking-tight">
                      Giá bán: {currentProduct.price}
                    </span>
                    {currentProduct.originalPrice && (
                      <span className="text-gray-400 line-through text-lg lg:text-xl">
                        {currentProduct.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-[#D42323] text-xs">Tiết kiệm 16.000đ so với giá gốc!</p>
                </div>

                {/* Product Description */}
                <div className="mb-6">
                  <h3 className="text-gray-800 text-base mb-3">Bao gồm:</h3>
                  <div className="space-y-2">
                    {currentProduct.description.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-[#D42323] rounded-full mt-1.5 flex-shrink-0"></div>
                        <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="text-gray-800 text-base mb-3 block">Số lượng:</label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        className="p-2 bg-gray-50 text-gray-800 hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-6 py-2 bg-white text-gray-800 text-lg min-w-[60px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        className="p-2 bg-gray-50 text-gray-800 hover:bg-gray-100 transition-all duration-200"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="text-gray-600">
                      <span className="text-sm">Tổng: </span>
                      <span className="text-[#D42323] text-lg">{formattedTotal}</span>
                    </div>
                  </div>
                </div>

                {/* Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-gradient-to-r from-[#D42323] to-[#B91C1C] text-white py-4 px-6 rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 uppercase tracking-wide text-base relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <span>MUA NGAY</span>
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                      <Plus size={16} />
                    </div>
                  </span>
                  <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>

                {/* Additional Info */}
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-2 text-blue-700">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">ℹ</span>
                    </div>
                    <span className="text-sm">Giao hàng miễn phí trong bán kính 5km</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-gray-800 text-2xl lg:text-3xl">THỰC ĐƠN LIÊN QUAN</h2>
              <div className="flex space-x-2">
                <button
                  onClick={prevCarousel}
                  className="p-2 bg-white text-gray-800 rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-md border border-gray-200"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextCarousel}
                  className="p-2 bg-white text-gray-800 rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-md border border-gray-200"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            {/* Carousel */}
            <div className="overflow-hidden">
              <div className="flex space-x-4 transition-transform duration-300">
                {getVisibleProducts().map((product, index) => (
                  <ProductCard key={`${product.id}-${index}`} product={product} />
                ))}
              </div>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 mb-8">
            {/* Review Submission Form */}
            <div className="mb-12">
              <h2 className="text-gray-800 text-2xl lg:text-3xl mb-6">Viết đánh giá của bạn</h2>
              
              <form onSubmit={handleReviewSubmit} className="space-y-6">
                {/* Star Rating Input */}
                <div>
                  <Label className="text-gray-700 mb-3 block">Đánh giá của bạn</Label>
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleStarClick(index)}
                        onMouseEnter={() => handleStarHover(index)}
                        onMouseLeave={handleStarLeave}
                        className="p-1 transition-transform duration-200 hover:scale-110"
                      >
                        <Star
                          size={32}
                          className={`${
                            index < (hoveredRating || rating)
                              ? "fill-[#FFC72C] text-[#FFC72C]"
                              : "text-gray-300 hover:text-[#FFC72C]"
                          } transition-colors duration-200`}
                        />
                      </button>
                    ))}
                    <span className="ml-3 text-gray-600">
                      {rating > 0 ? `${rating}/5 sao` : "Chọn số sao"}
                    </span>
                  </div>
                </div>

                {/* Comment Box */}
                <div>
                  <Label htmlFor="reviewComment" className="text-gray-700 mb-3 block">
                    Nhận xét của bạn
                  </Label>
                  <Textarea
                    id="reviewComment"
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
                    className="min-h-[120px] bg-gray-50 border-gray-200 focus:border-[#D42323] focus:ring-[#D42323]/20 resize-none"
                    rows={4}
                  />
                </div>

                {/* Error Message */}
                {reviewError && (
                  <p className="text-[#D42323] text-sm">{reviewError}</p>
                )}

                {/* Submit Button */}
                <div className="flex justify-start">
                  <Button
                    type="submit"
                    className="bg-[#D42323] hover:bg-[#B91C1C] text-white px-8 py-3 rounded-xl transition-colors duration-200 uppercase tracking-wide"
                  >
                    Gửi đánh giá
                  </Button>
                </div>
              </form>
            </div>

            {/* Existing Reviews */}
            <div>
              <h2 className="text-gray-800 text-2xl lg:text-3xl mb-8">Đánh giá từ khách hàng</h2>
              
              <div className="space-y-6">
                {sampleReviews.map((review) => (
                  <div key={review.id} className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <ImageWithFallback
                          src={review.avatar}
                          alt={`Avatar ${review.userName}`}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </div>
                      
                      {/* Review Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                          <div>
                            <h4 className="text-gray-800 font-medium">{review.userName}</h4>
                            <p className="text-gray-500 text-sm">{review.date}</p>
                          </div>
                          {renderStarRating(review.rating)}
                        </div>
                        
                        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <TexasChickenFooter />

      {/* Checkout Modal */}
      <AnimatePresence initial={false}>
        {showCheckoutModal && renderCheckoutModal()}
      </AnimatePresence>
    </div>
  );
}