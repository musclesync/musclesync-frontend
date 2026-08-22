import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

// Geçici RAM database (register API ile aynı)
const users: { email: string; passwordHash: string }[] = [];

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "E-posta ve şifre gereklidir." },
        { status: 400 }
      );
    }

    const user = users.find((u) => u.email === email);
    if (!user) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı." },
        { status: 404 }
      );
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Şifre yanlış." },
        { status: 401 }
      );
    }

    // ⭐ BURADA SESSION COOKIE OLUŞUYOR
    cookies().set("session", "true", {
      httpOnly: true,
      secure: true,
      path: "/",
    });

    return NextResponse.json(
      { success: true, message: "Giriş başarılı." },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Sunucu hatası." },
      { status: 500 }
    );
  }
}
