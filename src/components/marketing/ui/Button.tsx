import * as React from "react";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      primary: "bg-[var(--color-primary-700)] text-white hover:bg-[var(--color-primary-800)]",
      secondary:
        "bg-[var(--color-primary-100)] text-[var(--color-primary-800)] hover:bg-[var(--color-primary-50)]",
      outline:
        "border border-[var(--color-primary-700)] text-[var(--color-primary-700)] hover:bg-[var(--color-primary-50)]",
      ghost: "hover:bg-[var(--color-primary-50)] text-[var(--color-primary-700)]",
    };

    const sizes = {
      sm: "h-9 px-3",
      md: "h-10 px-4 py-2",
      lg: "h-12 px-8 text-base",
    };

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    return <button className={classes} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button };
