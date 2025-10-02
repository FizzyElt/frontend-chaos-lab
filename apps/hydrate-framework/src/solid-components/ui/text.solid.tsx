/** @jsxImportSource solid-js */
import { type JSX, type ParentProps, splitProps } from "solid-js";
import { cx } from "../../../styled-system/css";
import {
  type TextVariantProps,
  text,
} from "../../../styled-system/recipes/text";

interface TextProps
  extends JSX.HTMLAttributes<HTMLParagraphElement>,
    TextVariantProps {}

const Text = (props: ParentProps<TextProps>) => {
  const [textProps, parentChild, rest] = splitProps(
    props,
    ["variant", "size", "class"],
    ["children"],
  );
  return (
    <p
      class={cx(
        text({ size: textProps.size, variant: textProps.variant }),
        textProps.class,
      )}
      {...rest}
    >
      {parentChild.children}
    </p>
  );
};

export default Text;
