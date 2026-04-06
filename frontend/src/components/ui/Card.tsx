import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  onClick,
  selected = false,
  hover = true,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-charcoal-light rounded-2xl p-6 shadow-xl border transition-all duration-300
        ${onClick ? "cursor-pointer" : ""}
        ${selected ? "border-muted-blue ring-2 ring-muted-blue/20" : "border-white/5"}
        ${hover && !selected ? "hover:border-white/20 hover:bg-charcoal-light/80" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
