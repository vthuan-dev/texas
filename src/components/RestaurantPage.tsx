"use client";

import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import { Select } from "./ui/select";
import { Input } from "./ui/input";

interface Restaurant {
  id: string;
  name: string;
  address: string;
  district: string;
  city: string;
  phone: string;
  isOpen: boolean;
  openHours: string;
  image: string;
  lat: number;
  lng: number;
}

// Featured restaurants to show as suggestions
const featuredRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "Texas Chicken Sora Garden",
    address: "Tầng 1, TTTM Sora Garden, 201 Nguyễn Tuân, Thanh Xuân",
    district: "Thanh Xuân",
    city: "Hà Nội",
    phone: "024 3555 6789",
    isOpen: true,
    openHours: "9:00 - 22:00",
    image: "https://images.unsplash.com/photo-1692808571389-dc19b96da0b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXhhcyUyMGNoaWNrZW4lMjByZXN0YXVyYW50JTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzU5MTY0OTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    lat: 21.0096,
    lng: 105.8046
  },
  {
    id: "2", 
    name: "Texas Chicken Times City",
    address: "Tầng B1, TTTM Times City, 458 Minh Khai, Hai Bà Trưng",
    district: "Hai Bà Trưng",
    city: "Hà Nội",
    phone: "024 3888 9999",
    isOpen: true,
    openHours: "10:00 - 22:00",
    image: "https://images.unsplash.com/photo-1722666568623-637ce164f839?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXN0JTIwZm9vZCUyMHJlc3RhdXJhbnQlMjBzdG9yZSUyMGZyb250fGVufDF8fHx8MTc1OTE2NDk1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    lat: 21.0120,
    lng: 105.8636
  },
  {
    id: "3",
    name: "Texas Chicken Diamond Plaza",
    address: "Tầng 1, Diamond Plaza, 34 Lê Duẩn, Quận 1",
    district: "Quận 1",
    city: "TP.HCM",
    phone: "028 3888 7777",
    isOpen: true,
    openHours: "9:30 - 22:30",
    image: "https://images.unsplash.com/photo-1692808571389-dc19b96da0b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXhhcyUyMGNoaWNrZW4lMjByZXN0YXVyYW50JTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzU5MTY0OTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    lat: 10.7829,
    lng: 106.6996
  },
  {
    id: "4",
    name: "Texas Chicken Saigon Centre",
    address: "Tầng B1, Saigon Centre, 65 Lê Lợi, Quận 1",
    district: "Quận 1",
    city: "TP.HCM", 
    phone: "028 3999 6666",
    isOpen: true,
    openHours: "10:00 - 22:00",
    image: "https://images.unsplash.com/photo-1722666568623-637ce164f839?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXN0JTIwZm9vZCUyMHJlc3RhdXJhbnQlMjBzdG9yZSUyMGZyb250fGVufDF8fHx8MTc1OTE2NDk1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    lat: 10.7746,
    lng: 106.7017
  }
];

const cities = ["Tất cả tỉnh/thành", "Hà Nội", "TP.HCM"];
const districts = ["Tất cả quận/huyện", "Thanh Xuân", "Hai Bà Trưng", "Quận 1"];

interface RestaurantPageProps {
  onBackToHome?: () => void;
}

export function RestaurantPage({ onBackToHome }: RestaurantPageProps) {
  const [selectedCity, setSelectedCity] = useState("Tất cả tỉnh/thành");
  const [selectedDistrict, setSelectedDistrict] = useState("Tất cả quận/huyện");
  const [searchStreet, setSearchStreet] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);

  const filteredRestaurants = featuredRestaurants.filter(restaurant => {
    const cityMatch = selectedCity === "Tất cả tỉnh/thành" || restaurant.city === selectedCity;
    const districtMatch = selectedDistrict === "Tất cả quận/huyện" || restaurant.district === selectedDistrict;
    const streetMatch = !searchStreet || restaurant.address.toLowerCase().includes(searchStreet.toLowerCase());
    
    return cityMatch && districtMatch && streetMatch;
  });

  const handleRestaurantClick = (restaurantId: string) => {
    setSelectedRestaurant(restaurantId);
    // Scroll to restaurant card
    const element = document.getElementById(`restaurant-${restaurantId}`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleMapPinClick = (restaurantId: string) => {
    setSelectedRestaurant(restaurantId);
    // Scroll to restaurant in list
    const element = document.getElementById(`restaurant-${restaurantId}`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="min-h-screen bg-[#212121] flex flex-col">
      {/* Page Header */}
      <div className="bg-[#2A2A2A] py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-white mb-4">HỆ THỐNG NHÀ HÀNG</h1>
            <div className="w-20 h-1 bg-[#FFC72C] mx-auto rounded mb-4"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Tìm nhà hàng Texas Chicken gần bạn nhất. Với hơn {featuredRestaurants.length} cửa hàng trên toàn quốc, 
              chúng tôi luôn sẵn sàng phục vụ bạn.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Mobile Filters - Show on top on mobile */}
        <div className="lg:hidden bg-[#F5F5F5] p-4 border-b border-gray-300">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Tỉnh / Thành phố</label>
                <select 
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                >
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Quận / Huyện</label>
                <select 
                  value={selectedDistrict} 
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                >
                  {districts.map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Tìm theo tên đường</label>
              <Input
                placeholder="Nhập tên đường..."
                value={searchStreet}
                onChange={(e) => setSearchStreet(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Desktop Layout: Map and Restaurant List */}
        <div className="flex-1 flex flex-col lg:flex-row min-h-0">
          {/* Map Section - Left Column on Desktop, Below filters on Mobile (Smaller size) */}
          <div className="lg:w-2/5 h-64 lg:h-auto relative bg-gray-200 order-2 lg:order-1">
            {/* Google Maps Iframe */}
            <div className="absolute inset-0">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29804.306712119847!2d106.67803099379881!3d10.775233019884583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f38f9ed887b%3A0x14aded5703768989!2sDistrict%201%2C%20Ho%20Chi%20Minh%20City%2C%20Vietnam!5e1!3m2!1sen!2s!4v1759335718407!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
                title="Texas Chicken Locations Map"
              />
              
              {/* Map Overlay with Info */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white p-3 rounded-lg pointer-events-none">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-[#FFC72C]" />
                  <p className="text-sm">Google Maps</p>
                </div>
                <p className="text-xs text-gray-300">Tìm nhà hàng Texas Chicken gần bạn</p>
              </div>
            </div>
          </div>

          {/* Restaurant List Section - Right Column (Bigger size) */}
          <div className="lg:w-3/5 bg-[#F5F5F5] flex flex-col order-1 lg:order-2">
            {/* Desktop Filters */}
            <div className="hidden lg:block p-6 border-b border-gray-300">
              <h2 className="text-gray-800 mb-4">GỢI Ý NHÀ HÀNG</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Tỉnh / Thành phố</label>
                  <select 
                    value={selectedCity} 
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                  >
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Quận / Huyện</label>
                  <select 
                    value={selectedDistrict} 
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                  >
                    {districts.map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Tìm theo tên đường</label>
                  <Input
                    placeholder="Nhập tên đường..."
                    value={searchStreet}
                    onChange={(e) => setSearchStreet(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Restaurant List */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-6">
              <div className="mb-4">
                <p className="text-gray-600">
                  <span className="text-[#D42323]">{filteredRestaurants.length}</span> nhà hàng được gợi ý
                </p>
              </div>
              
              <div className="space-y-4">
                {filteredRestaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    id={`restaurant-${restaurant.id}`}
                    className={`bg-white rounded-xl p-4 shadow-sm transition-all duration-200 cursor-pointer hover:shadow-md ${
                      selectedRestaurant === restaurant.id ? 'ring-2 ring-[#D42323] shadow-lg' : ''
                    }`}
                    onClick={() => handleRestaurantClick(restaurant.id)}
                  >
                    <div className="flex gap-4">
                      {/* Restaurant Image */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={restaurant.image}
                          alt={restaurant.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Restaurant Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-gray-800 mb-2 truncate">{restaurant.name}</h3>
                        
                        <div className="flex items-start gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-600 text-sm leading-tight">{restaurant.address}</p>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-xs text-gray-600">{restaurant.openHours}</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span className="text-xs text-gray-600">{restaurant.phone}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className={`text-sm px-2 py-1 rounded-full ${
                            restaurant.isOpen 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {restaurant.isOpen ? 'Đang mở cửa' : 'Đã đóng cửa'}
                          </span>
                          
                          <button className="bg-[#D42323] text-white px-3 py-1.5 rounded-lg text-sm hover:bg-[#B91C1C] transition-colors duration-200 flex items-center gap-1">
                            <Navigation className="w-3 h-3" />
                            Chỉ đường
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredRestaurants.length === 0 && (
                <div className="text-center py-12">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-gray-600 mb-2">Không tìm thấy nhà hàng</h3>
                  <p className="text-gray-500 text-sm">Thử thay đổi bộ lọc tìm kiếm của bạn</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}