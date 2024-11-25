import { Icon } from "@iconify/react/dist/iconify.js";
import { SidebarItem as SidebarType } from "../types/types";
import SidebarItem from "./SidebarItem";

const Aside = () => {
  const sidebarItemsAfterHr: SidebarType[] = [
    { name: "Timeline", icon: "ix:project", path: "/" },
    { name: "Backlog", icon: "ix:project", path: "/" },
    { name: "Board", icon: "ix:project", path: "/" },
    { name: "Active Sprint", icon: "ix:project", path: "/" },
    { name: "Calendar", icon: "ix:project", path: "/" },
    { name: "Deadline Extensions", icon: "ix:project", path: "/" },
  ];
  return (
    <aside className="w-[4%] sticky left-0 top-0 border flex flex-col items-center gap-3 pt-2">
      <Icon icon={"ix:project"} className="mb-2 w-7 h-7" />
      <SidebarItem
        icon={"material-symbols:home-outline"}
        name={"Home"}
        path={"/"}
      />
      <hr className="border-b w-[80%]" />
      {sidebarItemsAfterHr.map((item, index) => (
        <SidebarItem
          icon={item.icon}
          name={item.name}
          path={item.path}
          key={index}
        />
      ))}
    </aside>
  );
};

export default Aside;
