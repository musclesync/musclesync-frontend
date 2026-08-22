import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Geçici RAM database
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

    const exists = users.find((u) => u.email === email);
    if (exists) {
      return NextResponse.json(
        { error: "Bu e-posta ile zaten bir hesap var." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    users.push({ email, passwordHash });

    return NextResponse.json(
      { success: true, message: "Kayıt başarılı." },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Sunucu hatası." },
      { status: 500 }
    );
  }
}
