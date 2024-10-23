"use client";
import { useState } from "react";
import { BiSearch, BiChat } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import SearchWithFilters from "./SearchWithFilters"; 

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const routes = [
    {
      icon: HiHome,
      label: "Home",
      href: "/",
    },
    {
      icon: BiSearch,
      label: "Search",
      onClick: () => setIsSearchOpen(true),
    },
    {
      icon: BiChat,
      label: "Chat",
      href: "/chat",
    },
  ];

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="flex h-full">
     <div
  className={`${
    isExpanded ? "w-[300px]" : "w-[80px]"
  } hidden md:flex flex-col gap-y-2 bg-black h-full p-2 transition-width duration-300 sticky top-0`}
>
        <Box>
          <div className="flex items-center justify-between px-5 py-4">
            <span className="text-white text-lg">
              {isExpanded ? "Menu" : ""}
            </span>
            <button onClick={toggleSidebar}>
              {isExpanded ? (
                <RxCaretLeft className="text-white" />
              ) : (
                <RxCaretRight className="text-white" />
              )}
            </button>
          </div>
          <div className="flex flex-col gap-y-4 px-5 py-4">
  {routes.map((item) => (
    <SidebarItem
      key={item.label}
      icon={item.icon}
      label={item.label} // Лейбл передается всегда
      onClick={item.onClick} // Вызываем onClick, если он есть
      href={item.href}
      isExpanded={isExpanded} // Передаем состояние боковой панели
    />
  ))}
</div>

        </Box>
        <Box className="overflow-y-auto h-full">
          {isExpanded && <Library />}
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">
        {isSearchOpen && (
          <SearchWithFilters setIsSearchOpen={setIsSearchOpen} /> // Открываем модальное окно поиска
        )}
        {children}
      </main>
    </div>
  );
};

export default Sidebar;

