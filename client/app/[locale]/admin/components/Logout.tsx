"use client";

import { useRouter } from "@/i18n/navigation";

function Logout() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        sessionStorage.clear();
        router.push("/login");
      }}
      className="w-full flex items-center gap-3 px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 transition-colors"
    >
      <span>تسجيل خروج</span>
    </button>
  );
}

export default Logout;
