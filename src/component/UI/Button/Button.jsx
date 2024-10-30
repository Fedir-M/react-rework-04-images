/* eslint-disable react/prop-types */
import IconBox from "../IconBox/IconBox";
import s from "./Button.module.css";

export const Button = (onClick, label, type, className, icon) => {
  return (
    <button
      className={`${s.button} ${className}`}
      type={type || "button"}
      onClick={onClick}
    >
      {icon && <IconBox id={icon} />}
      {label}
    </button>
  );
};
