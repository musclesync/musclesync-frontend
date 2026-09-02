"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Suspense } from "react";
import ResetPasswordInner from "./ResetPasswordInner";

export default function Page() {
  return (
    <Suspense>
      <ResetPasswordInner />
    </Suspense>
  );
}
