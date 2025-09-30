import React from "react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const provinces = [
  "Hồ Chí Minh",
  "Hà Nội", 
  "Đà Nẵng",
  "Cần Thơ",
  "Hải Phòng",
  "Biên Hòa",
  "Nha Trang",
  "Huế"
];

const districts = [
  "Quận 1",
  "Quận 2", 
  "Quận 3",
  "Quận 4",
  "Quận 5",
  "Quận 7",
  "Quận 10",
  "Thủ Đức"
];

interface StoreLocatorProps {
  onFindRestaurants?: () => void;
}

export function StoreLocator({ onFindRestaurants }: StoreLocatorProps) {
  return (
    <section className="relative py-20 px-4 lg:px-8 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1758448500813-59f3770da00d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBtb2Rlcm4lMjBkaW5pbmd8ZW58MXx8fHwxNzU5MDU1MzYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Content Box */}
        <div className="bg-[#D42323]/10 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-2xl">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl uppercase tracking-wide text-white mb-4">
              TÌM NHÀ HÀNG GẦN BẠN
            </h2>
            <div className="w-24 h-1 bg-[#FFC72C] mx-auto"></div>
          </div>

          {/* Search Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Province/City Dropdown */}
            <div className="space-y-2">
              <label className="block text-white uppercase tracking-wider text-sm">
                Tỉnh / Thành phố
              </label>
              <Select>
                <SelectTrigger className="w-full bg-white/90 backdrop-blur-sm border-0 text-gray-800 h-12">
                  <SelectValue placeholder="Chọn tỉnh/thành phố" />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((province) => (
                    <SelectItem key={province} value={province.toLowerCase()}>
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* District Dropdown */}
            <div className="space-y-2">
              <label className="block text-white uppercase tracking-wider text-sm">
                Quận / Huyện
              </label>
              <Select>
                <SelectTrigger className="w-full bg-white/90 backdrop-blur-sm border-0 text-gray-800 h-12">
                  <SelectValue placeholder="Chọn quận/huyện" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((district) => (
                    <SelectItem key={district} value={district.toLowerCase()}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Search Button */}
          <div className="text-center">
            <Button 
              size="lg"
              className="bg-[#FFC72C] hover:bg-[#E6B329] text-black px-12 py-3 text-lg uppercase tracking-wider shadow-lg"
              onClick={onFindRestaurants}
            >
              Tìm kiếm
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-white/90 text-sm">
              Tìm kiếm và khám phá hệ thống nhà hàng Texas Chicken gần bạn nhất
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}