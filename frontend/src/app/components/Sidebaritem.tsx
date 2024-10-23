"use client";
import { IconType } from "react-icons";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href?: string;
  isExpanded: boolean;
  onClick?: () => void; // Добавляем onClick
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
  href,
  isExpanded,
  onClick,
}) => {
  const content = (
    <div
      onClick={onClick}
      className={twMerge(
        `
        flex
        items-center
        w-full
        gap-x-4
        text-md
        font-medium
        cursor-pointer
        hover:text-purple-500
        transition
        text-neutral-400
        py-1
      `,
        active && "text-purple"
      )}
    >
      <Icon size={isExpanded ? 26 : 34} />
      {isExpanded && <p className="truncate w-full">{label}</p>}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  } else {
    return content;
  }
};

export default SidebarItem;
