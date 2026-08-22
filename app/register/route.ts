import { NextResponse } from "next/server";

// Basit bir in-memory database (gerçek DB bağlayana kadar)
const users: { email: string; password: string }[] = [];

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Alan kontrolü
    if (!email || !password) {
      return NextResponse.json(
        { error: "E-posta ve şifre gereklidir." },
        { status: 400 }
      );
    }

    // Kullanıcı zaten var mı?
    const exists = users.find((u) => u.email === email);
    if (exists) {
      return NextResponse.json(
        { error: "Bu e-posta ile zaten bir hesap var." },
        { status: 409 }
      );
    }

    // Kullanıcıyı oluştur
    users.push({ email, password });

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
