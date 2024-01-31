import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: async ({ token, req }) => {
      if (req.nextUrl.pathname.startsWith('/admin'))
        return token?.role === 'admin';
      return !!token;
    },
  },
});

export const config = {
  matcher: ['/admin/:path*', '/users/profile'],
};

//////////////////////////////////////////////

// Multiple middlewares example

// import { nextMiddleware } from './lib/middlewares';
// import { customAuthMiddleware } from './lib/middlewares/customAuthMiddleware';

// export default nextMiddleware([customAuthMiddleware, ...moreMiddlewares]);

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };

//////////////////////////////////////////////
