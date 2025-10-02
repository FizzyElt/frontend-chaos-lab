/** @jsxImportSource solid-js */
import { type JSX, type ParentProps, splitProps } from "solid-js";
import { cx } from "../../../styled-system/css";
import {
  type ButtonVariantProps,
  button,
} from "../../../styled-system/recipes/button";

interface ButtonProps
  extends JSX.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {}

const Button = (props: ParentProps<ButtonProps>) => {
  const [btnProps, parentChild, rest] = splitProps(
    props,
    ["variant", "size", "class"],
    ["children"],
  );
  return (
    <button
      class={cx(
        button({ size: btnProps.size, variant: btnProps.variant }),
        btnProps.class,
      )}
      {...rest}
    >
      {parentChild.children}
    </button>
  );
};

export default Button;
