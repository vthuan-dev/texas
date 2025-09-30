"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Filter, SlidersHorizontal, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { ProductCard } from "./ProductCard";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Mock product data
const allProducts = [
  {
    id: 1,
    name: "Bánh cuộn Mexicana - Cay",
    price: "69.000đ",
    originalPrice: "79.000đ",
    image: "https://images.unsplash.com/photo-1610903128105-752ef422a907?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwd3JhcCUyMHJvbGx8ZW58MXx8fHwxNzU5MTI4NDA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Bánh cuộn"
  },
  {
    id: 2,
    name: "Set Gà Rán Giòn Tan",
    price: "149.000đ",
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1605291581926-df4bf7ee3e89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNoaWNrZW4lMjBzZXQlMjBtZWFsfGVufDF8fHx8MTc1OTEyODQyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Gà rán"
  },
  {
    id: 3,
    name: "Burger Gà Sốt Bơ Tỏi",
    price: "89.000đ",
    originalPrice: "99.000đ",
    image: "https://images.unsplash.com/photo-1751890893837-d43f80a5baf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlzcHklMjBmcmllZCUyMGNoaWNrZW4lMjBidXJnZXJ8ZW58MXx8fHwxNzU5MTI4MzYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Burger"
  },
  {
    id: 4,
    name: "Cánh Gà Buffalo Cay",
    price: "129.000đ",
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1734987942068-a1a459d65d3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGljeSUyMGNoaWNrZW4lMjB3aW5nc3xlbnwxfHx8fDE3NTkxMjgzNzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Gà rán"
  },
  {
    id: 5,
    name: "Combo Gà Tender",
    price: "119.000đ",
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1608872689366-4cbcf0c7e72c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwdGVuZGVyJTIwY29tYm98ZW58MXx8fHwxNzU5MTI4MzkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Món ăn kèm"
  },
  {
    id: 6,
    name: "Set Gia Đình 4 Người",
    price: "399.000đ",
    originalPrice: "449.000đ",
    image: "https://images.unsplash.com/photo-1605291581926-df4bf7ee3e89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNoaWNrZW4lMjBzZXQlMjBtZWFsfGVufDF8fHx8MTc1OTEyODQyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Gà rán"
  }
];

interface SearchResultsPageProps {
  searchQuery?: string;
  onProductClick?: (product: any) => void;
  onMenuClick?: () => void;
}

export function SearchResultsPage({ searchQuery = "", onProductClick, onMenuClick }: SearchResultsPageProps) {
  const [sortBy, setSortBy] = useState("newest");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  // Simulate search filtering
  useEffect(() => {
    let filtered = allProducts;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter !== "all") {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, '')));
        break;
      case "price-high":
        filtered.sort((a, b) => parseInt(b.price.replace(/[^\d]/g, '')) - parseInt(a.price.replace(/[^\d]/g, '')));
        break;
      case "newest":
      default:
        // Keep original order for newest
        break;
    }

    setFilteredProducts(filtered);
  }, [searchQuery, sortBy, categoryFilter]);

  const categories = [
    { value: "all", label: "Tất cả" },
    { value: "Gà rán", label: "Gà rán" },
    { value: "Burger", label: "Burger" },
    { value: "Bánh cuộn", label: "Bánh cuộn" },
    { value: "Món ăn kèm", label: "Món ăn kèm" }
  ];

  const sortOptions = [
    { value: "newest", label: "Mới nhất" },
    { value: "price-low", label: "Giá: Thấp đến Cao" },
    { value: "price-high", label: "Giá: Cao đến Thấp" }
  ];

  // Mobile filter component
  const MobileFilters = () => (
    <div className="space-y-6 p-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sắp xếp theo
        </label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full">
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Loại món ăn
        </label>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Chọn loại món ăn" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  // No results state
  if (filteredProducts.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8 lg:px-8">
          {/* Search Query Display */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl text-gray-800 mb-2">
              Kết quả tìm kiếm cho: <span className="text-[#D42323]">"{searchQuery}"</span>
            </h1>
            <p className="text-gray-600">Tìm thấy 0 sản phẩm.</p>
          </div>

          {/* No Results State */}
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-8">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1631823794808-b359f1132de9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxubyUyMHJlc3VsdHMlMjBlbXB0eSUyMHN0YXRlJTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc1OTIyNDU0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Không tìm thấy kết quả"
                className="w-64 h-64 object-contain mx-auto opacity-50"
              />
            </div>
            
            <div className="max-w-md mx-auto space-y-4">
              <h2 className="text-xl lg:text-2xl text-gray-800">
                Rất tiếc, không tìm thấy sản phẩm nào phù hợp với từ khóa của bạn.
              </h2>
              <p className="text-gray-600">
                Vui lòng thử tìm kiếm với một từ khóa khác.
              </p>
              <Button 
                onClick={onMenuClick}
                className="bg-[#D42323] hover:bg-[#B91C1C] text-white px-8 py-3 uppercase tracking-wider"
                size="lg"
              >
                XEM TẤT CẢ THỰC ĐƠN
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 lg:px-8">
        {/* Search Query Display */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl text-gray-800 mb-2">
            Kết quả tìm kiếm cho: <span className="text-[#D42323]">"{searchQuery}"</span>
          </h1>
          <p className="text-gray-600">Tìm thấy {filteredProducts.length} sản phẩm.</p>
        </div>

        {/* Desktop Filters Bar */}
        <div className="hidden lg:flex items-center justify-between mb-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">Sắp xếp theo:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-white">
                  <SelectValue />
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

            <div className="flex items-center space-x-2">
              <span className="text-gray-700">Loại món ăn:</span>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full border-[#D42323] text-[#D42323] hover:bg-[#D42323] hover:text-white"
              >
                <SlidersHorizontal className="mr-2" size={20} />
                Bộ lọc & Sắp xếp
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-auto">
              <SheetHeader>
                <SheetTitle>Bộ lọc & Sắp xếp</SheetTitle>
              </SheetHeader>
              <MobileFilters />
            </SheetContent>
          </Sheet>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={onProductClick}
            />
          ))}
        </div>

        {/* Load More Button (if needed for pagination) */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <Button 
              variant="outline"
              size="lg"
              className="border-[#D42323] text-[#D42323] hover:bg-[#D42323] hover:text-white px-8 uppercase tracking-wider"
            >
              XEM THÊM SẢN PHẨM
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}