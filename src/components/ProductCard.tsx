import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  category?: string;
}

interface ProductCardProps {
  product: Product;
  onProductClick?: (product: Product) => void;
}

export function ProductCard({ product, onProductClick }: ProductCardProps) {
  return (
    <Card 
      className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md overflow-hidden cursor-pointer"
      onClick={() => onProductClick?.(product)}
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
            onClick={(e) => {
              e.stopPropagation();
              onProductClick?.(product);
            }}
            className="w-full bg-[#D42323] hover:bg-[#B91C1C] text-white uppercase tracking-wider"
            size="sm"
          >
            XEM CHI TIẾT
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}