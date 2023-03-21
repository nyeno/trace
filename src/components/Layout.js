import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { useTheme } from "../context/ThemeContext";

export const SidebarLayout = () => {
  const { modalOpen, openModal, closeModal, isMobile } = useTheme()

  return (
    <div className="flex ">
      <div
        className={`fixed top-16 left-0 side ${modalOpen ? "w-56" : "w-16"} `}
      >
        <SideBar />
      </div>
      <div
        className={`${modalOpen ? "ml-56" : "ml-16"} w-full overflow-x-hidden `}
      >
        <Outlet />
      </div>
    </div>
  );
};
