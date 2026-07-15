import type { ReactNode } from "react";

type AuthCardPageLayoutProps = {
  children: ReactNode;
  className?: string;
};

export default function AuthCardPageLayout({
  children,
  className = "",
}: AuthCardPageLayoutProps) {
  return (
    <div
      className={`auth-split-page auth-card-page auth-card-page--centered${className ? ` ${className}` : ""}`}
    >
      <div className="auth-split-page__layout">{children}</div>
    </div>
  );
}
