/* eslint-disable react/prop-types */
import IconBox from "../IconBox/IconBox";
import s from "./Button.module.css";

const Button = ({
  onClick,
  label,
  type = "button",
  className = "",
  icon = null,
}) => {
  return (
    <button
      className={`${s.button} ${className}`}
      type={type}
      onClick={onClick}
    >
      {icon && <IconBox id={icon} />}
      {label}
    </button>
  );
};

export default Button;
