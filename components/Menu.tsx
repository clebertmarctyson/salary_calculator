"use client";

import useStore from "@/lib/store";

import { SidebarOpen, SidebarClose } from "lucide-react";

export const Menu = () => {
  const { menuOpen, setMenuOpen } = useStore();

  return (
    <div className="fixed top-0 right-0 p-4 z-50">
      <button className="text-white" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <SidebarClose /> : <SidebarOpen />}
      </button>
    </div>
  );
};

export default Menu;
