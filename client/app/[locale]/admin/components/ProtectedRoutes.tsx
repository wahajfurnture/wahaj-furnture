"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import Spinner from "./Spinner";

interface ProtectedRoutesProps {
  children: ReactNode;
}

function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("session");
    if (!token) {
      router.push("/login");
    } else {
      setHasToken(true);
    }
    setIsChecking(false);
  }, [router]);

  if (isChecking) {
    return <Spinner />;
  }

  if (!hasToken) {
    return null;
  }

  return <>{children}</>;
}

export default ProtectedRoutes;
