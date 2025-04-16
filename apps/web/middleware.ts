import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdmin } from "./app/utils/sessionHelpers";

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith("/admin")) {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        if (!(await isAdmin())) return NextResponse.redirect(url);
    }
}
