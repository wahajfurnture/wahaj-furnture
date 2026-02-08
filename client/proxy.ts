import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get(
    "__Secure-better-auth.session_token",
  )?.value;

  if (pathname.includes("/login") && sessionToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/curtains";
    return NextResponse.redirect(url);
  }

  if (pathname.match(/\/admin\/?$/)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/\/admin\/?$/, "/admin/curtains");
    return NextResponse.redirect(url);
  }

  if (pathname.includes("/admin")) {
    if (!sessionToken) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
