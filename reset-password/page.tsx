// force rebuild

"use client";

export const dynamic = "force-dynamic";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");
  const type = searchParams.get("type");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const valid = type === "recovery" && token;

  useEffect(() => {
    if (valid) {
      supabase.auth.setSession({
        access_token: token!,
        refresh_token: token!,
      });
    }
  }, [valid, token]);

  const handleReset = async () => {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      setMessage("Şifre güncellenemedi: " + error.message);
      return;
    }

    setMessage("Şifre başarıyla güncellendi!");
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  if (!valid) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Geçersiz veya eksik şifre yenileme bağlantısı.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <h1 className="text-3xl font-semibold mb-6">Yeni Şifre Belirle</h1>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <input
          type="password"
          placeholder="Yeni şifre"
          className="rounded-xl bg-white/10 px-4 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          disabled={loading || password.length < 6}
          className="rounded-xl bg-red-500 px-4 py-2 font-semibold disabled:opacity-50"
        >
          {loading ? "Güncelleniyor..." : "Şifreyi Güncelle"}
        </button>

        {message && <p className="text-red-400 text-sm">{message}</p>}
      </div>
    </div>
  );
}
