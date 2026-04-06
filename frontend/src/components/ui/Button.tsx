import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}) => {
  const baseStyles = "transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed font-semibold py-3 px-6 rounded-xl text-center";
  
  const variants = {
    primary: "bg-muted-blue hover:bg-muted-blue-hover text-white",
    secondary: "bg-white/5 hover:bg-white/10 text-off-white border border-white/10",
    outline: "bg-transparent hover:bg-white/5 text-off-white border border-white/20",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
