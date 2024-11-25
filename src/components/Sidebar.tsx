import { ReactNode } from "react";
import Aside from "./Aside";

interface Props {
  children?: ReactNode;
}

const Sidebar: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative flex flex-end">
      <Aside />
      <div className="w-[96%] overflow-auto">{children}</div>
    </div>
  );
};

export default Sidebar;
