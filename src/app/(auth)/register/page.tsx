import { Suspense } from "react";
import RegisterPage from "@/components/pages/register";

export default function Register() {
  return (
    <Suspense fallback={null}>
      <RegisterPage />
    </Suspense>
  );
}
