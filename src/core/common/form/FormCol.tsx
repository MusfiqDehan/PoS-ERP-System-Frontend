import type { ReactNode } from "react";

type FormColProps = {
  children: ReactNode;
  sm?: number;
  lg?: number;
  className?: string;
};

export default function FormCol({
  children,
  sm = 6,
  lg,
  className,
}: FormColProps) {
  const colClass =
    className ??
    [lg ? `col-lg-${lg}` : null, `col-sm-${sm}`, "col-12"]
      .filter(Boolean)
      .join(" ");

  return <div className={colClass}>{children}</div>;
}
