"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
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

  // Eğer Supabase linki doğru geldiyse type=recovery ve token dolu olur
  const valid = type === "recovery" && token;

  const handleReset = async () => {
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });

    setLoading(false);

    if (error) {
      setMessage("Şifre güncellenemedi: " + error