"use-client";

import { ButtonHTMLAttributes, FC } from "react";
import { IconType } from "react-icons";

type ButtonProps = {
  label?: string;
  onClick?: (...args: any) => void;
  icon?: IconType;
  classOverride?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = (props) => {
  const {
    onClick = () => {},
    label,
    icon: Icon,
    classOverride = "",
    disabled,
    ...rest
  } = props;

  return (
    <button
      className={`flex flex-row h-auto items-center justify-center gap-x-4 cursor-pointer border border-black rounded transition  px-3 py-2 bg-white text-black hover:bg-black hover:text-white ${classOverride} ${
        disabled && " cursor-not-allowed"
      }`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {Icon && <Icon />}
      {label && <p>{label}</p>}
    </button>
  );
};

export default Button;
