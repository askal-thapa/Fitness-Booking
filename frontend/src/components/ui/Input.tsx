import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = "", ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-off-white/60 ml-1">
          {label}
        </label>
      )}
      <input
        className={`bg-charcoal rounded-xl border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-muted-blue/50 transition-all text-off-white placeholder:text-off-white/20 w-full ${className}`}
        {...props}
      />
    </div>
  );
};
