"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { authClient } from "../../lib/auth";
import Spinner from "./Spinner";

interface ProtectedRoutesProps {
  children: ReactNode;
}

function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending) {
      if (
        !session ||
        (session.user as { role?: "user" | "admin" })?.role !== "admin"
      ) {
        router.push("/login");
      }
    }
  }, [session, isPending, router]);

  if (isPending) {
    return <Spinner />;
  }

  if (
    !session ||
    (session.user as { role?: "user" | "admin" })?.role !== "admin"
  ) {
    return null;
  }

  return <>{children}</>;
}

export default ProtectedRoutes;
