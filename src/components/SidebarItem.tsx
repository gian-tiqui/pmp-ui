import { SidebarItem as SidebarItemType } from "../types/types";
import { Icon } from "@iconify/react/dist/iconify.js";

const SidebarItem: React.FC<SidebarItemType> = ({ icon }) => {
  return (
    <div className="flex gap-2 p-1 rounded hover:bg-gray-200">
      <Icon icon={icon} className="h-7 w-7" />
    </div>
  );
};

export default SidebarItem;
