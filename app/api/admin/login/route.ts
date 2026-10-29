import { NextRequest, NextResponse } from "next/server";
import { verifyAdminCredentials, setAdminCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required." },
        { status: 400 }
      );
    }

    const isValid = verifyAdminCredentials(username, password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid admin credentials. Please verify username and password." },
        { status: 401 }
      );
    }

    const res = NextResponse.json({
      success: true,
      message: "Admin authentication successful.",
    });

    setAdminCookie(res);
    return res;
  } catch (err: any) {
    return NextResponse.json(
      { error: "Login failed. Server error." },
      { status: 500 }
    );
  }
}
