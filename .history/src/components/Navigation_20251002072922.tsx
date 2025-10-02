"use client";

import { useState, useCallback } from "react";
import { TexasChickenHeader } from "./TexasChickenHeader";
import { TexasChickenFooter } from "./TexasChickenFooter";
import { HeroBanner } from "./HeroBanner";
import { ProductShowcase } from "./ProductShowcase";
import { StoreLocator } from "./StoreLocator";
import { NewsEvents } from "./NewsEvents";
import { AuthForm } from "./AuthForm";
import { MenuPage } from "./MenuPage";
import { ProductDetailPage } from "./ProductDetailPage";
import { CheckoutPage } from "./CheckoutPage";
import { SuccessModal } from "./SuccessModal";
import { AboutPage } from "./AboutPage";
import { OrderTrackingPage } from "./OrderTrackingPage";
import { FlashSale } from "./FlashSale";
import { NewsPage } from "./NewsPage";
import { RestaurantPage } from "./RestaurantPage";
import { SearchResultsPage } from "./SearchResultsPage";
import { EventDetailPage } from "./EventDetailPage";

type PageView =
  | "homepage"
  | "auth"
  | "menu"
  | "product-detail"
  | "checkout"
  | "about"
  | "order-tracking"
  | "news"
  | "restaurant"
  | "search-results"
  | "event-detail";
type AuthMode = "login" | "register";

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  description: string[];
}

export function Navigation() {
  const [currentPage, setCurrentPage] =
    useState<PageView>("homepage");
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [showSuccessModal, setShowSuccessModal] =
    useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState("Minh Khải");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEventId, setSelectedEventId] = useState<number>(1);

  const handleUserClick = () => {
    setCurrentPage("auth");
    setAuthMode("login");
  };

  const handleLogoClick = () => {
    setCurrentPage("homepage");
  };

  const handleMenuClick = () => {
    setCurrentPage("menu");
  };

  const handleAboutClick = () => {
    setCurrentPage("about");
  };

  const handleOrderTrackingClick = () => {
    setCurrentPage("order-tracking");
  };

  const handleNewsClick = () => {
    setCurrentPage("news");
  };

  const handleRestaurantClick = () => {
    setCurrentPage("restaurant");
  };

  const handleArticleClick = (articleId: number) => {
    setSelectedEventId(articleId);
    setCurrentPage("event-detail");
  };

  const handleBackToNews = () => {
    setCurrentPage("news");
  };

  const handleProductDetail = (product?: Product) => {
    if (product) {
      setSelectedProduct(product);
    }
    setCurrentPage("product-detail");
  };

  const handleBuyNow = (product: Product, quantity: number) => {
    setSelectedProduct(product);
    setOrderQuantity(quantity);
    setCurrentPage("checkout");
  };

  const handleOrderComplete = () => {
    setShowSuccessModal(true);
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    setCurrentPage("homepage");
    setSelectedProduct(null);
    setOrderQuantity(1);
  };

  const handleSwitchAuthMode = (mode: AuthMode) => {
    setAuthMode(mode);
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage("homepage");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    setCurrentPage("homepage");
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage("search-results");
  };

  const renderMainContent = () => {
    if (currentPage === "auth") {
      return (
        <AuthForm
          mode={authMode}
          onSwitchMode={handleSwitchAuthMode}
          onAuthSuccess={handleAuthSuccess}
        />
      );
    }

    return (
      <>
        <HeroBanner
          onProductClick={handleProductDetail}
          onSearch={handleSearch}
        />
        <FlashSale onProductClick={handleProductDetail} />
        <ProductShowcase onProductClick={handleProductDetail} />
        <StoreLocator />
        <NewsEvents onNewsClick={handleNewsClick} />
      </>
    );
  };

  const getActiveLink = () => {
    if (currentPage === "menu") return "THỰC ĐƠN";
    if (currentPage === "homepage") return "TRANG CHỦ";
    if (currentPage === "about") return "VỀ TEXAS CHICKEN";
    if (currentPage === "news") return "TIN TỨC";
    if (currentPage === "restaurant") return "NHÀ HÀNG";
    return undefined;
  };

  // Special handling for pages with their own header/footer
  if (currentPage === "menu") {
    return (
      <MenuPage
        onProductClick={handleProductDetail}
        onLogoClick={handleLogoClick}
        onUserClick={handleUserClick}
        onMenuClick={handleMenuClick}
        onAboutClick={handleAboutClick}
        onRestaurantClick={handleRestaurantClick}
        onOrderTrackingClick={handleOrderTrackingClick}
        onNewsClick={handleNewsClick}
        onLogout={handleLogout}
        isLoggedIn={isLoggedIn}
        userName={userName}
      />
    );
  }

  if (currentPage === "product-detail") {
    return (
      <>
        <ProductDetailPage
          product={selectedProduct || undefined}
          onBackToHome={handleLogoClick}
          onBackToMenu={handleMenuClick}
          onOrderComplete={handleOrderComplete}
          onUserClick={handleUserClick}
          onLogoClick={handleLogoClick}
          onMenuClick={handleMenuClick}
          onAboutClick={handleAboutClick}
          onRestaurantClick={handleRestaurantClick}
          onOrderTrackingClick={handleOrderTrackingClick}
          onNewsClick={handleNewsClick}
          onLogout={handleLogout}
          isLoggedIn={isLoggedIn}
          userName={userName}
        />
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={handleModalClose}
          onGoHome={handleLogoClick}
        />
      </>
    );
  }

  if (currentPage === "checkout") {
    return (
      <>
        <CheckoutPage
          product={selectedProduct || undefined}
          quantity={orderQuantity}
          onBackToHome={handleLogoClick}
          onOrderComplete={handleOrderComplete}
          onUserClick={handleUserClick}
          onLogoClick={handleLogoClick}
          onMenuClick={handleMenuClick}
          onAboutClick={handleAboutClick}
          onRestaurantClick={handleRestaurantClick}
          onOrderTrackingClick={handleOrderTrackingClick}
          onNewsClick={handleNewsClick}
          onLogout={handleLogout}
          isLoggedIn={isLoggedIn}
          userName={userName}
        />
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={handleModalClose}
          onGoHome={handleLogoClick}
        />
      </>
    );
  }

  if (currentPage === "order-tracking") {
    return (
      <OrderTrackingPage
        onBackToHome={handleLogoClick}
        onMenuClick={handleMenuClick}
        onOrderTrackingClick={handleOrderTrackingClick}
        onUserClick={handleUserClick}
        onLogoClick={handleLogoClick}
        onAboutClick={handleAboutClick}
        onRestaurantClick={handleRestaurantClick}
        onNewsClick={handleNewsClick}
        onLogout={handleLogout}
        isLoggedIn={isLoggedIn}
        userName={userName}
      />
    );
  }

  if (currentPage === "news") {
    return (
      <NewsPage
        onLogoClick={handleLogoClick}
        onUserClick={handleUserClick}
        onMenuClick={handleMenuClick}
        onAboutClick={handleAboutClick}
        onRestaurantClick={handleRestaurantClick}
        onOrderTrackingClick={handleOrderTrackingClick}
        onNewsClick={handleNewsClick}
        onLogout={handleLogout}
        onArticleClick={handleArticleClick}
        isLoggedIn={isLoggedIn}
        userName={userName}
      />
    );
  }

  if (currentPage === "about") {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <TexasChickenHeader
          onUserClick={handleUserClick}
          onLogoClick={handleLogoClick}
          onMenuClick={handleMenuClick}
          onAboutClick={handleAboutClick}
          onRestaurantClick={handleRestaurantClick}
          onOrderTrackingClick={handleOrderTrackingClick}
          onNewsClick={handleNewsClick}
          onLogout={handleLogout}
          activeLink="VỀ TEXAS CHICKEN"
          isLoggedIn={isLoggedIn}
          userName={userName}
        />

        <main className="flex-1">
          <AboutPage onBackToHome={handleLogoClick} />
        </main>

        <TexasChickenFooter />
      </div>
    );
  }

  if (currentPage === "restaurant") {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <TexasChickenHeader
          onUserClick={handleUserClick}
          onLogoClick={handleLogoClick}
          onMenuClick={handleMenuClick}
          onAboutClick={handleAboutClick}
          onRestaurantClick={handleRestaurantClick}
          onOrderTrackingClick={handleOrderTrackingClick}
          onNewsClick={handleNewsClick}
          onLogout={handleLogout}
          activeLink="NHÀ HÀNG"
          isLoggedIn={isLoggedIn}
          userName={userName}
        />

        <main className="flex-1">
          <RestaurantPage onBackToHome={handleLogoClick} />
        </main>

        <TexasChickenFooter />
      </div>
    );
  }

  if (currentPage === "search-results") {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <TexasChickenHeader
          onUserClick={handleUserClick}
          onLogoClick={handleLogoClick}
          onMenuClick={handleMenuClick}
          onAboutClick={handleAboutClick}
          onRestaurantClick={handleRestaurantClick}
          onOrderTrackingClick={handleOrderTrackingClick}
          onNewsClick={handleNewsClick}
          onLogout={handleLogout}
          activeLink={undefined}
          isLoggedIn={isLoggedIn}
          userName={userName}
        />

        <main className="flex-1">
          <SearchResultsPage
            searchQuery={searchQuery}
            onProductClick={handleProductDetail}
            onMenuClick={handleMenuClick}
          />
        </main>

        <TexasChickenFooter />
      </div>
    );
  }

  if (currentPage === "event-detail") {
    return (
      <EventDetailPage
        onLogoClick={handleLogoClick}
        onUserClick={handleUserClick}
        onMenuClick={handleMenuClick}
        onAboutClick={handleAboutClick}
        onRestaurantClick={handleRestaurantClick}
        onOrderTrackingClick={handleOrderTrackingClick}
        onNewsClick={handleNewsClick}
        onLogout={handleLogout}
        onBackToNews={handleBackToNews}
        onRelatedArticleClick={handleArticleClick}
        eventId={selectedEventId}
        isLoggedIn={isLoggedIn}
        userName={userName}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TexasChickenHeader
        onUserClick={handleUserClick}
        onLogoClick={handleLogoClick}
        onMenuClick={handleMenuClick}
        onAboutClick={handleAboutClick}
        onRestaurantClick={handleRestaurantClick}
        onOrderTrackingClick={handleOrderTrackingClick}
        onNewsClick={handleNewsClick}
        onLogout={handleLogout}
        activeLink={getActiveLink()}
        isLoggedIn={isLoggedIn}
        userName={userName}
      />

      <main className="flex-1">{renderMainContent()}</main>

      <TexasChickenFooter />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleModalClose}
        onGoHome={handleLogoClick}
      />
    </div>
  );
}