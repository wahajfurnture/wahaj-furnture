import { Grid } from "@radix-ui/themes";
import React from "react";
import AdminDesktopNav from "./AdminDesktopNav";
import HandleMobileOpen from "./components/HandleMobileOpen";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "لوحه تحكم الادمن",
};

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50" dir="ltr">
      <HandleMobileOpen />

      <div className="lg:flex lg:min-h-screen">
        <AdminDesktopNav />

        <main className="flex-1 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Grid className="bg-white rounded-lg shadow-sm min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-4rem)] p-4 lg:p-8">
              {children}
            </Grid>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
