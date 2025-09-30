"use client";
import { useState } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

interface ProductFilterSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  category: string;
  onCategoryChange: (category: string) => void;
}

const sortOptions = [
  { value: "newest", label: "Mới nhất" },
  { value: "price-low", label: "Giá: Thấp đến Cao" },
  { value: "price-high", label: "Giá: Cao đến Thấp" },
  { value: "name", label: "Tên A-Z" }
];

const categoryOptions = [
  { value: "all", label: "Tất cả" },
  { value: "combo", label: "Combo" },
  { value: "chicken", label: "Gà rán" },
  { value: "burger", label: "Burger" },
  { value: "side", label: "Món phụ" },
  { value: "drink", label: "Thức uống" },
  { value: "dessert", label: "Tráng miệng" }
];

export function ProductFilterSearch({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  category,
  onCategoryChange
}: ProductFilterSearchProps) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4 lg:p-6 mb-6">
      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center justify-between gap-6">
        {/* Search Bar - Left Side */}
        <div className="flex-1 max-w-md relative">
          <div className="relative">
            <Search 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
            <Input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200 focus:border-[#D42323] focus:ring-[#D42323]/20 h-12"
            />
          </div>
        </div>

        {/* Filter Dropdowns - Right Side */}
        <div className="flex items-center gap-4">
          {/* Sort By Dropdown */}
          <div className="min-w-[200px]">
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-[#D42323] focus:ring-[#D42323]/20 h-12">
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Category Dropdown */}
          <div className="min-w-[180px]">
            <Select value={category} onValueChange={onCategoryChange}>
              <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-[#D42323] focus:ring-[#D42323]/20 h-12">
                <SelectValue placeholder="Loại món ăn" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden space-y-4">
        {/* Search Bar - Full Width */}
        <div className="relative">
          <Search 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          />
          <Input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-gray-50 border-gray-200 focus:border-[#D42323] focus:ring-[#D42323]/20 h-12"
          />
        </div>

        {/* Filter Button */}
        <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full h-12 bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700"
            >
              <Filter size={18} className="mr-2" />
              Bộ lọc
              <ChevronDown size={16} className="ml-auto" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="bg-white">
            <SheetHeader>
              <SheetTitle className="text-gray-800">Lọc sản phẩm</SheetTitle>
            </SheetHeader>
            
            <div className="space-y-6 mt-6">
              {/* Sort By */}
              <div>
                <h3 className="text-gray-700 mb-3">Sắp xếp theo</h3>
                <Select value={sortBy} onValueChange={onSortChange}>
                  <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-[#D42323] focus:ring-[#D42323]/20">
                    <SelectValue placeholder="Chọn cách sắp xếp" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Category */}
              <div>
                <h3 className="text-gray-700 mb-3">Loại món ăn</h3>
                <Select value={category} onValueChange={onCategoryChange}>
                  <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-[#D42323] focus:ring-[#D42323]/20">
                    <SelectValue placeholder="Chọn loại món ăn" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Apply Button */}
              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-[#D42323] hover:bg-[#B91C1C] text-white h-12"
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  Áp dụng bộ lọc
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1 border-[#D42323] text-[#D42323] hover:bg-[#D42323] hover:text-white h-12"
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  Tìm kiếm
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}