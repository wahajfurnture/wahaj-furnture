"use client";

import { useState } from "react";
import AdminMobileNav from "../AdminMobileNav";

function HandleMobileOpen() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <AdminMobileNav
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={setMobileMenuOpen}
    />
  );
}

export default HandleMobileOpen;
