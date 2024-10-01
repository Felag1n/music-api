import { IconType } from "react-icons";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
    icon: IconType;
    label: string;
    active?: boolean;
    href: string;
    isExpanded: boolean; // Добавляем этот пропс
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    icon: Icon,
    label,
    active,
    href,
    isExpanded // Получаем состояние панели
}) => {
    return (
        <Link
            href={href}
            className={twMerge(`
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
            `, active && "text-purple")}
        >
          
            <Icon size={isExpanded ? 26 : 34} /> 
      
            {isExpanded && <p className="truncate w-full">{label}</p>}
        </Link>
    );
}

export default SidebarItem;
