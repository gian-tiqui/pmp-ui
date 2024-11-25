import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const Sidebar: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default Sidebar;
