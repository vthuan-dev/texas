import { TexasChickenHeader } from "./TexasChickenHeader";
import { TexasChickenFooter } from "./TexasChickenFooter";
import { Breadcrumb } from "./Breadcrumb";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CheckCircle, Clock, Truck, Package } from "lucide-react";

interface OrderTrackingPageProps {
  onBackToHome?: () => void;
  onMenuClick?: () => void;
  onOrderTrackingClick?: () => void;
  onUserClick?: () => void;
  onLogoClick?: () => void;
  onAboutClick?: () => void;
  onRestaurantClick?: () => void;
  onNewsClick?: () => void;
  onLogout?: () => void;
  isLoggedIn?: boolean;
  userName?: string;
}

export function OrderTrackingPage({ 
  onBackToHome, 
  onMenuClick, 
  onOrderTrackingClick,
  onUserClick,
  onLogoClick,
  onAboutClick,
  onRestaurantClick,
  onNewsClick,
  onLogout,
  isLoggedIn = true,
  userName = "Minh Khải"
}: OrderTrackingPageProps) {
  const breadcrumbItems = [
    { label: "Trang chủ", onClick: onBackToHome },
    { label: "Theo dõi đơn hàng", active: true }
  ];

  // Sample order data
  const orderData = {
    orderNumber: "#TX123456",
    orderDate: "29/09/2025",
    total: "189.000đ",
    status: 2, // 0: Confirmed, 1: Preparing, 2: Delivering, 3: Delivered
    estimatedDelivery: "30-45 phút",
    items: [
      {
        id: 1,
        name: "Combo Burger Tex Supreme",
        quantity: 1,
        price: "89.000đ",
        image: "https://images.unsplash.com/photo-1707750795395-f9a4cababde9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwYnVyZ2VyJTIwc2FuZHdpY2h8ZW58MXx8fHwxNzU5MTQ2MDM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        id: 2,
        name: "Gà Rán Truyền Thống",
        quantity: 2,
        price: "50.000đ",
        image: "https://images.unsplash.com/photo-1605291581926-df4bf7ee3e89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhkZWxpY2lvdXMlMjBmcmllZCUyMGNoaWNrZW4lMjBjb21ibyUyMG1lYWx8ZW58MXx8fHwxNzU5MTQ3NzY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      }
    ],
    deliveryAddress: "123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh",
    paymentMethod: "Thanh toán khi nhận hàng"
  };

  const orderSteps = [
    {
      id: 0,
      title: "Đã xác nhận",
      description: "Đơn hàng đã được xác nhận",
      icon: CheckCircle,
      time: "14:30"
    },
    {
      id: 1,
      title: "Đang chuẩn bị",
      description: "Đầu bếp đang chuẩn bị món ăn",
      icon: Clock,
      time: "14:45"
    },
    {
      id: 2,
      title: "Đang giao hàng",
      description: "Đơn hàng đang trên đường giao",
      icon: Truck,
      time: "15:15"
    },
    {
      id: 3,
      title: "Giao hàng thành công",
      description: "Đơn hàng đã được giao thành công",
      icon: Package,
      time: ""
    }
  ];

  const getStepStatus = (stepId: number) => {
    if (stepId < orderData.status) return "completed";
    if (stepId === orderData.status) return "active";
    return "pending";
  };

  const getStepStyles = (status: string) => {
    switch (status) {
      case "completed":
        return {
          container: "text-green-600",
          icon: "bg-green-600 text-white",
          line: "bg-green-600"
        };
      case "active":
        return {
          container: "text-[#D42323]",
          icon: "bg-[#D42323] text-white",
          line: "bg-gray-300"
        };
      default:
        return {
          container: "text-gray-400",
          icon: "bg-gray-300 text-gray-600",
          line: "bg-gray-300"
        };
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <TexasChickenHeader 
        onLogoClick={onLogoClick || onBackToHome} 
        onUserClick={onUserClick}
        onMenuClick={onMenuClick}
        onAboutClick={onAboutClick}
        onRestaurantClick={onRestaurantClick}
        onOrderTrackingClick={onOrderTrackingClick}
        onNewsClick={onNewsClick}
        onLogout={onLogout}
        isLoggedIn={isLoggedIn}
        userName={userName}
      />

      {/* Main Content */}
      <main className="flex-1 bg-[#F9F9F9] min-h-screen">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} />

          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-gray-800 text-3xl lg:text-4xl mb-2">Chi tiết đơn hàng</h1>
            <p className="text-gray-600">Theo dõi trạng thái đơn hàng của bạn</p>
          </div>

          {/* Order Summary Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-gray-600 text-sm">Mã đơn hàng</p>
                <p className="text-gray-800 text-lg">{orderData.orderNumber}</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600 text-sm">Ngày đặt</p>
                <p className="text-gray-800 text-lg">{orderData.orderDate}</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600 text-sm">Tổng thanh toán</p>
                <p className="text-[#D42323] text-xl">{orderData.total}</p>
              </div>
            </div>

            {/* Estimated Delivery Time */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Thời gian giao hàng dự kiến</p>
                  <p className="text-gray-800 text-lg">{orderData.estimatedDelivery}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 text-sm">Trạng thái hiện tại</p>
                  <p className="text-[#D42323]">{orderSteps[orderData.status].title}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Progress */}
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 mb-8">
            <h2 className="text-gray-800 text-2xl mb-8">Tiến trình đơn hàng</h2>
            
            {/* Desktop Progress Bar */}
            <div className="hidden md:block">
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-300 z-0"></div>
                <div 
                  className="absolute top-6 left-6 h-0.5 bg-green-600 z-10 transition-all duration-500"
                  style={{ 
                    width: `${(orderData.status / (orderSteps.length - 1)) * 100}%`,
                    maxWidth: "calc(100% - 48px)"
                  }}
                ></div>

                <div className="relative z-20 flex justify-between">
                  {orderSteps.map((step, index) => {
                    const status = getStepStatus(step.id);
                    const styles = getStepStyles(status);
                    const Icon = step.icon;
                    
                    return (
                      <div key={step.id} className="flex flex-col items-center space-y-3">
                        <div 
                          className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-lg ${styles.icon}`}
                        >
                          <Icon size={20} />
                        </div>
                        <div className="text-center max-w-[120px]">
                          <p className={`mb-1 text-sm ${styles.container}`}>
                            {step.title}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {step.description}
                          </p>
                          {step.time && (
                            <p className="text-gray-400 text-xs mt-1">
                              {step.time}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mobile Progress - Vertical Layout */}
            <div className="md:hidden space-y-4">
              {orderSteps.map((step, index) => {
                const status = getStepStatus(step.id);
                const styles = getStepStyles(status);
                const Icon = step.icon;
                const isLast = index === orderSteps.length - 1;
                
                return (
                  <div key={step.id} className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${styles.icon}`}
                      >
                        <Icon size={16} />
                      </div>
                      {!isLast && (
                        <div className={`w-0.5 h-12 mt-2 ${
                          orderData.status > step.id ? 'bg-green-600' : 'bg-gray-300'
                        }`}></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className={`${styles.container}`}>
                          {step.title}
                        </p>
                        {step.time && (
                          <p className="text-gray-400 text-sm">
                            {step.time}
                          </p>
                        )}
                      </div>
                      <p className="text-gray-500 text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 mb-8">
            <h2 className="text-gray-800 text-2xl mb-6">Chi tiết món ăn</h2>
            
            <div className="space-y-4">
              {orderData.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 py-4 border-b border-gray-100 last:border-b-0">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-800 mb-1">{item.name}</h3>
                    <p className="text-gray-600 text-sm">Số lượng: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#D42323]">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Địa chỉ giao hàng:</span>
                  <span className="text-gray-800 text-right max-w-xs">{orderData.deliveryAddress}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Phương thức thanh toán:</span>
                  <span className="text-gray-800">{orderData.paymentMethod}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <span className="text-gray-800">Tổng cộng:</span>
                  <span className="text-[#D42323] text-xl">{orderData.total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 lg:p-8">
            <div className="text-center">
              <h3 className="text-gray-800 text-xl mb-2">Cần hỗ trợ?</h3>
              <p className="text-gray-600 mb-4">
                Nếu bạn có bất kỳ thắc mắc nào về đơn hàng, vui lòng liên hệ với chúng tôi
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-[#D42323] text-white px-6 py-3 rounded-xl hover:bg-[#B91C1C] transition-colors duration-200">
                  Gọi hotline: 1900-xxxx
                </button>
                <button className="border border-[#D42323] text-[#D42323] px-6 py-3 rounded-xl hover:bg-[#D42323] hover:text-white transition-colors duration-200">
                  Chat với CSKH
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <TexasChickenFooter />
    </div>
  );
}