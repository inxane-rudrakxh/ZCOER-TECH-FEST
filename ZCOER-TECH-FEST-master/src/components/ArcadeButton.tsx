import React from "react";
import { Link } from "react-router-dom";

export type ArcadeButtonVariant = "primary" | "secondary" | "surface" | "full";

export interface ArcadeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ArcadeButtonVariant;
  href?: string;
  to?: string;
  children: React.ReactNode;
  className?: string;
}

export const ArcadeButton: React.FC<ArcadeButtonProps> = ({
  variant = "primary",
  href,
  to,
  children,
  className = "",
  ...props
}) => {
  let baseClasses =
    "inline-flex items-center justify-center uppercase tracking-wider rounded-xl transition-all font-headline-md ";

  switch (variant) {
    case "primary":
      baseClasses +=
        "group gap-3 px-8 py-4 bg-primary-container text-on-surface text-headline-md shadow-xl hover:-translate-y-1 active:translate-y-1 ";
      break;
    case "secondary":
      baseClasses +=
        "gap-2 px-6 py-4 bg-secondary text-on-secondary text-[16px] shadow-md hover:-translate-y-0.5 active:translate-y-0.5 ";
      break;
    case "surface":
      baseClasses +=
        "gap-2 px-6 py-4 bg-surface-container-high text-on-surface text-[16px] shadow-md hover:-translate-y-0.5 active:translate-y-0.5 ";
      break;
    case "full":
      baseClasses =
        "w-full py-4 rounded-xl bg-secondary text-on-secondary font-headline-md text-headline-md uppercase tracking-wider shadow-[4px_4px_0px_0px_#1c1b1b] border-[3px] border-on-surface hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 ";
      break;
  }

  const finalClasses = `${baseClasses} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={finalClasses}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={finalClasses}>
        {children}
      </a>
    );
  }

  return (
    <button className={finalClasses} {...props}>
      {children}
    </button>
  );
};
