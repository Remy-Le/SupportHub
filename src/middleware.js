import { NextResponse } from "next/server";

export const config = {
  matcher: "/integrations/:path*",
};

export function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-createxyz-project-id", "0c93d6cd-5682-4d64-94c0-959a3865559a");
  requestHeaders.set("x-createxyz-project-group-id", "32f3bf54-2c6e-435b-b331-a17ebd2b296b");


  request.nextUrl.href = `https://www.createanything.com/${request.nextUrl.pathname}`;

  return NextResponse.rewrite(request.nextUrl, {
    request: {
      headers: requestHeaders,
    },
  });
}