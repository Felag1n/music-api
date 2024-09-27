"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import Box from "./Box";
import SidebarItem from "./Sidebaritem";
import Library from "./Library";
import Header from "./Header"; // импортируем Header
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();
  const [currentPathIndex, setCurrentPathIndex] = useState(0); // Индекс для текущей страницы
  const routes = [
    {
      icon: HiHome,
      label: "Home",
      href: "/",
    },
    {
      icon: BiSearch,
      label: "Search",
      href: "/search",
    },
    // Добавьте другие маршруты, если нужно
  ];

  // Функция для переключения на предыдущий маршрут
  const handleBack = () => {
    setCurrentPathIndex((prev) => Math.max(prev - 1, 0));
  };

  // Функция для переключения на следующий маршрут
  const handleForward = () => {
    setCurrentPathIndex((prev) =>
      Math.min(prev + 1, routes.length - 1)
    );
  };

  return (
    <div className="flex h-full">
      <div
        className="
          hidden
          md:flex
          flex-col
          gap-y-2
          bg-black
          h-full
          w-[300px]
          p-2
        "
      >
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item, index) => (
              <SidebarItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                href={item.href}
                active={index === currentPathIndex} // активный элемент на основе индекса
              />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">
        {/* Передаем функции handleBack и handleForward в Header */}
        <Header onBack={handleBack} onForward={handleForward}>
          {children}
        </Header>
      </main>
    </div>
  );
};

export default Sidebar;
