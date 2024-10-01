"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { BiSearch, BiChat } from "react-icons/bi"; // Добавляем иконку чата
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import Box from "./Box";
import SidebarItem from "./Sidebaritem";
import Library from "./Library";
import Header from "./Header";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true); // Управление расширенным или компактным состоянием
  const [currentPathIndex, setCurrentPathIndex] = useState(0);

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
    {
      icon: BiChat, // Иконка чата
      label: "Chat",
      href: "/chat", // Предположительно, страница чата
    },
  ];

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev); // Переключаем между компактным и расширенным состоянием
  };

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
        className={`
          ${isExpanded ? "w-[300px]" : "w-[80px]"} // Изменение ширины боковой панели в зависимости от состояния
          hidden
          md:flex
          flex-col
          gap-y-2
          bg-black
          h-full
          p-2
          transition-width
          duration-300
        `}
      >
        <Box>
          <div className="flex items-center justify-between px-5 py-4">
            <span className="text-white text-lg">
              {isExpanded ? "Menu" : ""}
            </span>
            <button onClick={toggleSidebar}>
              {isExpanded ? <RxCaretLeft className="text-white" /> : <RxCaretRight className="text-white" />}
            </button>
          </div>
          <div className="flex flex-col gap-y-4 px-5 py-4">
    {routes.map((item, index) => (
        <SidebarItem
            key={item.label}
            icon={item.icon}
            label={isExpanded ? item.label : ""} // Если панель свёрнута, показываем только иконку
            href={item.href}
            active={index === currentPathIndex}
            isExpanded={isExpanded} // Передаем состояние панели
        />
    ))}
</div>
        </Box>
        <Box className="overflow-y-auto h-full">
          {isExpanded && <Library />} {/* Показываем Library только если панель расширена */}
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">
        <Header onBack={handleBack} onForward={handleForward}>
          {children}
        </Header>
      </main>
    </div>
  );
};

export default Sidebar;
