import { SignupLoginForm } from "@/components/signup-login-form";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <Image
            width={45}
            height={45}
            src={"/Wahaaj-logo-removebg.png"}
            alt="Website's Logo"
          />
        </Link>
        <SignupLoginForm />
      </div>
    </div>
  );
}
