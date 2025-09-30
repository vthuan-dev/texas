import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {index > 0 && <ChevronRight size={16} className="text-gray-500" />}
          {item.onClick ? (
            <button
              onClick={item.onClick}
              className="hover:text-[#FFC72C] transition-colors duration-200"
            >
              {item.label}
            </button>
          ) : (
            <span className={item.active ? "text-[#FFC72C]" : ""}>{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}