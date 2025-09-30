import React from "react";
import { useState } from "react";
import { TexasChickenHeader } from "./TexasChickenHeader";
import { TexasChickenFooter } from "./TexasChickenFooter";
import { ProductFilterSearch } from "./ProductFilterSearch";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  category: string;
}

const categories = [
  "GÀ SỐT BƠ TỎI & THẢO MỘC",
  "GÀ RÁN TRUYỀN THỐNG", 
  "COMBO ĐỒNG GIÁ 119K",
  "SET GÀ RÁN TRUYỀN THỐNG",
  "BÁNH CUỘN",
  "BURGER",
  "MỲ Ý & CƠM GÀ",
  "GÀ GIÒN KHÔNG XƯƠNG & KHUỶU CÁNH GÀ",
  "THỨC ĂN KÈM"
];

const products: Product[] = [
  {
    id: 1,
    name: "Combo 08 Miếng Gà Rán Truyền Thống",
    price: "469.000đ",
    originalPrice: "523.000đ",
    image: "https://images.unsplash.com/photo-1605291581926-df4bf7ee3e89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNoaWNrZW4lMjBjb21ibyUyMG1lYWx8ZW58MXx8fHwxNzU5MTQ2MDMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "GÀ RÁN TRUYỀN THỐNG"
  },
  {
    id: 2,
    name: "Combo 06 Miếng Gà Rán Truyền Thống",
    price: "359.000đ",
    originalPrice: "457.000đ",
    image: "https://images.unsplash.com/photo-1605291581926-df4bf7ee3e89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNoaWNrZW4lMjBjb21ibyUyMG1lYWx8ZW58MXx8fHwxNzU5MTQ2MDMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "GÀ RÁN TRUYỀN THỐNG"
  },
  {
    id: 3,
    name: "Combo Tex Sampler - Gà Rán Truyền Thống",
    price: "119.000đ",
    originalPrice: "137.000đ",
    image: "https://images.unsplash.com/photo-1719043043635-70d2b4c55845?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlzcHklMjBmcmllZCUyMGNoaWNrZW4lMjB3aW5nc3xlbnwxfHx8fDE3NTkxNDYwMzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "COMBO ĐỒNG GIÁ 119K"
  },
  {
    id: 4,
    name: "Combo 02 Miếng Gà Rán Truyền Thống",
    price: "119.000đ",
    originalPrice: "136.000đ",
    image: "https://images.unsplash.com/photo-1605291581926-df4bf7ee3e89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNoaWNrZW4lMjBjb21ibyUyMG1lYWx8ZW58MXx8fHwxNzU5MTQ2MDMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "COMBO ĐỒNG GIÁ 119K"
  },
  {
    id: 5,
    name: "Burger Gà Giòn Đặc Biệt",
    price: "89.000đ",
    image: "https://images.unsplash.com/photo-1707750795395-f9a4cababde9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwYnVyZ2VyJTIwc2FuZHdpY2h8ZW58MXx8fHwxNzU5MTQ2MDM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "BURGER"
  },
  {
    id: 6,
    name: "Bánh Cuộn Gà Giòn",
    price: "65.000đ",
    image: "https://images.unsplash.com/photo-1610903128105-752ef422a907?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwd3JhcCUyMHJvbGwlMjBmb29kfGVufDF8fHx8MTc1OTE0NjA0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "BÁNH CUỘN"
  },
  {
    id: 7,
    name: "Set 04 Miếng Gà Rán + 2 Nước",
    price: "249.000đ",
    originalPrice: "279.000đ",
    image: "https://images.unsplash.com/photo-1605291581926-df4bf7ee3e89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNoaWNrZW4lMjBjb21ibyUyMG1lYWx8ZW58MXx8fHwxNzU5MTQ2MDMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "SET GÀ RÁN TRUYỀN THỐNG"
  },
  {
    id: 8,
    name: "Gà Sốt Bơ Tỏi & Thảo Mộc",
    price: "149.000đ",
    originalPrice: "179.000đ",
    image: "https://images.unsplash.com/photo-1719043043635-70d2b4c55845?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlzcHklMjBmcmllZCUyMGNoaWNrZW4lMjB3aW5nc3xlbnwxfHx8fDE3NTkxNDYwMzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "GÀ SỐT BƠ TỎI & THẢO MỘC"
  }
];

interface MenuPageProps {
  onProductClick?: () => void;
  onLogoClick?: () => void;
  onUserClick?: () => void;
  onMenuClick?: () => void;
  onAboutClick?: () => void;
  onRestaurantClick?: () => void;
  onOrderTrackingClick?: () => void;
  onNewsClick?: () => void;
  onLogout?: () => void;
  isLoggedIn?: boolean;
  userName?: string;
}

export function MenuPage({ 
  onProductClick,
  onLogoClick,
  onUserClick,
  onMenuClick,
  onAboutClick,
  onRestaurantClick,
  onOrderTrackingClick,
  onNewsClick,
  onLogout,
  isLoggedIn,
  userName
}: MenuPageProps) {
  const [selectedCategory, setSelectedCategory] = useState(categories[1]); // Default to "GÀ RÁN TRUYỀN THỐNG"
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterCategory, setFilterCategory] = useState("all");
  const productsPerPage = 8;

  // Filter products by selected category and search/filter criteria
  let filteredProducts = products.filter(product => {
    // Category filter (sidebar)
    const categoryMatch = product.category === selectedCategory;
    
    // Search filter
    const searchMatch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter category (from ProductFilterSearch)
    const filterCategoryMatch = filterCategory === "all" || 
      (filterCategory === "combo" && product.category.includes("COMBO")) ||
      (filterCategory === "chicken" && (product.category.includes("GÀ") || product.category.includes("CHICKEN"))) ||
      (filterCategory === "burger" && product.category.includes("BURGER")) ||
      (filterCategory === "side" && (product.category.includes("BÁNH") || product.category.includes("PHỤ"))) ||
      (filterCategory === "drink" && product.category.includes("NƯỚC")) ||
      (filterCategory === "dessert" && product.category.includes("TRÁNG MIỆNG"));
    
    return categoryMatch && searchMatch && filterCategoryMatch;
  });

  // Sort products
  if (sortBy === "price-low") {
    filteredProducts.sort((a, b) => {
      const priceA = parseInt(a.price.replace(/[^\d]/g, ''));
      const priceB = parseInt(b.price.replace(/[^\d]/g, ''));
      return priceA - priceB;
    });
  } else if (sortBy === "price-high") {
    filteredProducts.sort((a, b) => {
      const priceA = parseInt(a.price.replace(/[^\d]/g, ''));
      const priceB = parseInt(b.price.replace(/[^\d]/g, ''));
      return priceB - priceA;
    });
  } else if (sortBy === "name") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }
  // "newest" is default order, no sorting needed

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  // Add more products if needed to fill the grid
  const allProducts = [...currentProducts];
  while (allProducts.length < productsPerPage && products.length > allProducts.length) {
    const additionalProducts = products.filter(p => !allProducts.some(ap => ap.id === p.id));
    if (additionalProducts.length > 0) {
      allProducts.push(...additionalProducts.slice(0, productsPerPage - allProducts.length));
    } else {
      break;
    }
  }

  interface ProductCardProps { product: Product }
  const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="aspect-square overflow-hidden">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-gray-800 mb-3 line-clamp-2">{product.name}</h3>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-[#D42323]">{product.price}</span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-sm">{product.originalPrice}</span>
            )}
          </div>
        </div>
        <button 
          onClick={onProductClick}
          className="w-full bg-[#D42323] text-white py-2 px-4 rounded-lg hover:bg-[#B91C1C] transition-colors duration-200 uppercase tracking-wide"
        >
          XEM CHI TIẾT
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#212121] flex flex-col">
      {/* Header */}
      <TexasChickenHeader 
        activeLink="THỰC ĐƠN"
        onUserClick={onUserClick}
        onLogoClick={onLogoClick}
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
      <main className="flex-1 bg-white">
        {/* Desktop Layout */}
        <div className="hidden lg:flex max-w-7xl mx-auto px-8 py-8 space-x-8">
          {/* Left Sidebar - Categories (25%) */}
          <div className="w-1/4">
            <div className="sticky top-8">
              <div className="bg-[#F5F5F5] rounded-xl p-6">
                <h2 className="text-gray-800 mb-6 text-center">DANH MỤC</h2>
                <nav className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 text-sm ${
                        selectedCategory === category
                          ? 'bg-[#D42323] text-white'
                          : 'text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Right Content Area (75%) */}
          <div className="w-3/4">

            {/* Product Filter and Search */}
            <ProductFilterSearch
              searchQuery={searchQuery}
              onSearchChange={(query) => {
                setSearchQuery(query);
                setCurrentPage(1);
              }}
              sortBy={sortBy}
              onSortChange={(sort) => {
                setSortBy(sort);
                setCurrentPage(1);
              }}
              category={filterCategory}
              onCategoryChange={(category) => {
                setFilterCategory(category);
                setCurrentPage(1);
              }}
            />

            {/* Products Grid */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              {allProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-2">
              {Array.from({ length: Math.max(totalPages, 3) }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 border ${
                    currentPage === page
                      ? 'bg-[#D42323] text-white border-[#D42323]'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-200'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden px-4 py-6">
          <div className="mb-6">
            {/* Product Filter and Search - Mobile */}
            <ProductFilterSearch
              searchQuery={searchQuery}
              onSearchChange={(query) => {
                setSearchQuery(query);
                setCurrentPage(1);
              }}
              sortBy={sortBy}
              onSortChange={(sort) => {
                setSortBy(sort);
                setCurrentPage(1);
              }}
              category={filterCategory}
              onCategoryChange={(category) => {
                setFilterCategory(category);
                setCurrentPage(1);
              }}
            />
            
            {/* Category Dropdown */}
            <div className="relative mb-6">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-[#F5F5F5] text-gray-700 px-4 py-3 rounded-lg flex items-center justify-between border border-gray-200"
              >
                <span className="text-sm truncate">{selectedCategory}</span>
                {isDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-10 max-h-64 overflow-y-auto border border-gray-200">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setCurrentPage(1);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm border-b border-gray-200 last:border-b-0 transition-colors duration-200 ${
                        selectedCategory === category
                          ? 'bg-[#D42323] text-white'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Products Grid - 2 columns for mobile */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {allProducts.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Mobile Pagination */}
          <div className="flex justify-center items-center space-x-2">
            {Array.from({ length: Math.max(totalPages, 3) }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg transition-colors duration-200 text-sm border ${
                  currentPage === page
                    ? 'bg-[#D42323] text-white border-[#D42323]'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-200'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <TexasChickenFooter />
    </div>
  );
}