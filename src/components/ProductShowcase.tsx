import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const products = [
  {
    id: 1,
    name: "Bánh cuộn Mexicana - Cay",
    price: "69.000đ",
    originalPrice: "79.000đ",
    image: "https://images.unsplash.com/photo-1610903128105-752ef422a907?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwd3JhcCUyMHJvbGx8ZW58MXx8fHwxNzU5MTI4NDA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 2,
    name: "Set Gà Rán Giòn Tan",
    price: "149.000đ",
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1605291581926-df4bf7ee3e89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNoaWNrZW4lMjBzZXQlMjBtZWFsfGVufDF8fHx8MTc1OTEyODQyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 3,
    name: "Burger Gà Sốt Bơ Tỏi",
    price: "89.000đ",
    originalPrice: "99.000đ",
    image: "https://images.unsplash.com/photo-1751890893837-d43f80a5baf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlzcHklMjBmcmllZCUyMGNoaWNrZW4lMjBidXJnZXJ8ZW58MXx8fHwxNzU5MTI4MzYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 4,
    name: "Cánh Gà Buffalo Cay",
    price: "129.000đ",
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1734987942068-a1a459d65d3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGljeSUyMGNoaWNrZW4lMjB3aW5nc3xlbnwxfHx8fDE3NTkxMjgzNzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 5,
    name: "Combo Gà Tender",
    price: "119.000đ",
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1608872689366-4cbcf0c7e72c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwdGVuZGVyJTIwY29tYm98ZW58MXx8fHwxNzU5MTI4MzkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 6,
    name: "Set Gia Đình 4 Người",
    price: "399.000đ",
    originalPrice: "449.000đ",
    image: "https://images.unsplash.com/photo-1605291581926-df4bf7ee3e89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNoaWNrZW4lMjBzZXQlMjBtZWFsfGVufDF8fHx8MTc1OTEyODQyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 7,
    name: "Burger Phô Mai Đặc Biệt",
    price: "79.000đ",
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1751890893837-d43f80a5baf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlzcHklMjBmcmllZCUyMGNoaWNrZW4lMjBidXJnZXJ8ZW58MXx8fHwxNzU5MTI4MzYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 8,
    name: "Bánh Cuộn Truyền Thống",
    price: "59.000đ",
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1610903128105-752ef422a907?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwd3JhcCUyMHJvbGx8ZW58MXx8fHwxNzU5MTI4NDA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

interface ProductShowcaseProps {
  onProductClick?: () => void;
}

export function ProductShowcase({ onProductClick }: ProductShowcaseProps) {
  return (
    <section className="py-16 px-4 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl uppercase tracking-wide text-[#D42323] mb-4">
            HÔM NAY ĂN GÌ?
          </h2>
          <div className="w-24 h-1 bg-[#FFC72C] mx-auto"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card 
              key={product.id} 
              className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md overflow-hidden"
            >
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.originalPrice && (
                    <div className="absolute top-3 right-3 bg-[#D42323] text-white px-2 py-1 rounded-full text-sm">
                      SALE
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-3">
                  <h3 className="text-gray-800 min-h-[3rem] line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-[#D42323]">
                      Giá: {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-gray-400 line-through text-sm">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Button 
                    onClick={onProductClick}
                    className="w-full bg-[#D42323] hover:bg-[#B91C1C] text-white uppercase tracking-wider"
                    size="sm"
                  >
                    XEM CHI TIẾT
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline"
            size="lg"
            className="border-[#D42323] text-[#D42323] hover:bg-[#D42323] hover:text-white px-8 uppercase tracking-wider"
          >
            XEM TẤT CẢ SẢN PHẨM
          </Button>
        </div>
      </div>
    </section>
  );
}