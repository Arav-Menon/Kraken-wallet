import React from "react";
import Sidebar from "../../../components/component/sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen  ">
        <Sidebar/>
      <main className="flex-1 p-4 bg-white">{children}</main>
    </div>
  );
}
