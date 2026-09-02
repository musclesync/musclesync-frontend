"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage("Giriş yapılamadı: " + error.message);
      return;
    }

    setMessage("Giriş başarılı!");
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setMessage("Lütfen önce email adresinizi girin.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://www.musclesync.net/reset-password",
    });

    setLoading(false);

    if (error) {
      setMessage("Şifre sıfırlama maili gönderilemedi: " + error.message);
      return;
    }

    setMessage("Şifre sıfırlama maili gönderildi! Lütfen emailinizi kontrol edin.");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <h1 className="text-3xl font-semibold mb-6">MuscleSync Giriş</h1>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <input
          type="email"
          placeholder="Email"
          className="rounded-xl bg-white/10 px-4 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Şifre"
          className="rounded-xl bg-white/10 px-4 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="rounded-xl bg-red-500 px-4 py-2 font-semibold disabled:opacity-50"
        >
          {loading ? "İşleniyor..." : "Giriş Yap"}
        </button>

        <button
          onClick={handleForgotPassword}
          className="text-sm text-blue-400 underline"
        >
          Şifremi Unuttum
        </button>

        {message && <p className="text-red-400 text-sm">{message}</p>}
      </div>
    </div>
  );
}
