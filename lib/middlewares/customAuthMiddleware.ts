import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from 'next/server';
import { MiddlewareType } from '../types';

/*
  Example of custom middleware for usage in Multiple (nextMiddleware) middleware
*/
export function customAuthMiddleware(middleware: MiddlewareType) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const response = NextResponse.next();
    const path = request.nextUrl.pathname;
    const search = request.nextUrl.search;

    // catch and add search params to login and register url
    // in order to show/hide Login/Register button in AppBar
    if (path === '/api/auth/signin' && search !== '?isLogin=true') {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('isLogin', 'true');
      return NextResponse.redirect(loginUrl);
    }
    if (path === '/auth/register' && search !== '?isRegister=true') {
      const registerUrl = new URL('/auth/register', request.url);
      registerUrl.searchParams.set('isRegister', 'true');
      return NextResponse.redirect(registerUrl);
    }
    return middleware(request, event, response);
  };
}
