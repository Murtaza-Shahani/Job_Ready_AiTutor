import React from "react";
import { theme } from "../../theme";

const Button = ({ children, onClick, type = "button", variant = "primary" }) => {
  const styles = {
    primary: `bg-[${theme.colors.primary}] hover:bg-[${theme.colors.primaryDark}] text-white`,
    secondary: `bg-[${theme.colors.secondary}] hover:opacity-90 text-white`,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles[variant]} px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300`}
    >
      {children}
    </button>
  );
};

export default Button;
