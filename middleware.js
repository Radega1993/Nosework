import { NextResponse } from 'next/server';
import {
  getLanguageFromPath,
  isValidLanguage,
  getPreferredLanguage,
  addLanguagePrefix,
  removeLanguagePrefix,
  mapRouteToPhysicalPath,
  DEFAULT_LANGUAGE,
  LOCALE_COOKIE_NAME,
} from './utils/i18n';

/**
 * Next.js middleware for i18n routing
 * 
 * Handles:
 * - Language prefix detection and validation
 * - Redirects URLs without prefix to /es/...
 * - Redirects URLs with invalid prefix to /es/...
 * - Language detection from browser and cookie
 * - Cookie persistence for language preference
 */
export function middleware(request) {
  const { pathname, search } = request.nextUrl;
  
  // Exclude API routes
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }
  
  // Exclude dashboard routes (private routes don't need i18n)
  // Check both with and without language prefix - dashboard should never have language prefix
  if (pathname.startsWith('/dashboard') || pathname === '/dashboard') {
    return NextResponse.next();
  }
  
  // Exclude login and register routes (they handle their own redirects)
  if (pathname === '/login' || pathname === '/register') {
    return NextResponse.next();
  }
  
  // Exclude static files (_next, images, etc.)
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname.match(/\.(ico|png|jpg|jpeg|gif|svg|css|js|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next();
  }
  
  // Check if path already has a valid language prefix
  const currentLang = getLanguageFromPath(pathname);
  if (currentLang && isValidLanguage(currentLang)) {
    const pathWithoutLang = removeLanguagePrefix(pathname);
    
    // If path has language prefix but is dashboard/login/register, redirect to version without prefix
    // (these routes shouldn't have language prefix)
    if (pathWithoutLang.startsWith('/dashboard') || pathWithoutLang === '/dashboard' || 
        pathWithoutLang === '/login' || pathWithoutLang === '/register') {
      const redirectUrl = new URL(pathWithoutLang + search, request.url);
      return NextResponse.redirect(redirectUrl, 301);
    }
    
    // Valid language prefix found - rewrite to internal path without prefix
    // Handle root path: /es or /es/ should rewrite to /
    let finalPath = pathWithoutLang;
    if (finalPath === '/' || finalPath === '') {
      finalPath = '/';
    }
    
    // Map Spanish route names to physical page file names
    // e.g., /eventos -> /events
    const physicalPath = mapRouteToPhysicalPath(finalPath);
    
    // Create rewrite URL (internal rewrite, URL in browser stays the same)
    const rewriteUrl = new URL(physicalPath + search, request.url);
    
    // Use rewrite instead of next() to map /es/... to /... internally
    const response = NextResponse.rewrite(rewriteUrl);
    
    // Set cookie using NextResponse (Edge Runtime compatible)
    const maxAge = 365 * 24 * 60 * 60; // 1 year in seconds
    response.cookies.set(LOCALE_COOKIE_NAME, currentLang, {
      path: '/',
      maxAge,
      sameSite: 'lax',
    });
    return response;
  }
  
  // No valid language prefix - need to redirect
  // Get preferred language from cookie or browser
  const preferredLang = getPreferredLanguage({
    cookies: Object.fromEntries(
      request.cookies.getAll().map(cookie => [cookie.name, cookie.value])
    ),
    headers: {
      'accept-language': request.headers.get('accept-language') || '',
    },
  });
  
  // Remove any existing invalid language prefix
  const pathWithoutLang = removeLanguagePrefix(pathname);
  
  // Add correct language prefix
  const newPath = addLanguagePrefix(pathWithoutLang, preferredLang);
  
  // Create redirect URL preserving query parameters
  const redirectUrl = new URL(newPath + search, request.url);
  
  // Create response with redirect
  const response = NextResponse.redirect(redirectUrl, 301); // Permanent redirect
  
  // Set language cookie using NextResponse (Edge Runtime compatible)
  const maxAge = 365 * 24 * 60 * 60; // 1 year in seconds
  response.cookies.set(LOCALE_COOKIE_NAME, preferredLang, {
    path: '/',
    maxAge,
    sameSite: 'lax',
  });
  
  return response;
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - static files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)).*)',
  ],
};
