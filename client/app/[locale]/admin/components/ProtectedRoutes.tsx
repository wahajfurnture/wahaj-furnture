"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import Spinner from "./Spinner";
import { authClient } from "../../lib/auth";

interface ProtectedRoutesProps {
  children: ReactNode;
}

function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !data?.session) {
      router.push("/login");
    }
  }, [data?.session, isPending, router]);

  if (isPending) {
    return <Spinner />;
  }

  if (!data?.session) {
    return null;
  }

  return <>{children}</>;
}

export default ProtectedRoutes;
