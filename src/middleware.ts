import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    authorized: ({ token, req }) => {
      const { pathname } = req.nextUrl;
      const publicRoutes = ["/", "/auth/login", "/auth/register"];
      if (publicRoutes.includes(pathname)) return true;

      if (
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/resources")
      ) {
        return !!token;
      }

      return true;
    },
  },
});

export const config = {
  matcher: ["/dashboard/:path*", "/resources/:path*"],
};

