/** @jsxImportSource solid-js */
import { type JSX, type ParentProps, splitProps } from "solid-js";
import { cx } from "../../../styled-system/css";
import {
  type TextVariantProps,
  text,
} from "../../../styled-system/recipes/text";

interface TextProps
  extends JSX.HTMLAttributes<HTMLHeadingElement>,
    TextVariantProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading = (props: ParentProps<TextProps>) => {
  const [headingProps, parentChild, rest] = splitProps(
    props,
    ["as", "variant", "size", "class"],
    ["children"],
  );

  if (headingProps.as === "h2") {
    return (
      <h2
        class={cx(
          text({ size: headingProps.size, variant: headingProps.variant }),
          headingProps.class,
        )}
        {...rest}
      >
        {parentChild.children}
      </h2>
    );
  }

  if (headingProps.as === "h3") {
    return (
      <h3
        class={cx(
          text({ size: headingProps.size, variant: headingProps.variant }),
          headingProps.class,
        )}
        {...rest}
      >
        {parentChild.children}
      </h3>
    );
  }

  if (headingProps.as === "h4") {
    return (
      <h4
        class={cx(
          text({ size: headingProps.size, variant: headingProps.variant }),
          headingProps.class,
        )}
        {...rest}
      >
        {parentChild.children}
      </h4>
    );
  }

  if (headingProps.as === "h5") {
    return (
      <h5
        class={cx(
          text({ size: headingProps.size, variant: headingProps.variant }),
          headingProps.class,
        )}
        {...rest}
      >
        {parentChild.children}
      </h5>
    );
  }

  if (headingProps.as === "h6") {
    return (
      <h6
        class={cx(
          text({ size: headingProps.size, variant: headingProps.variant }),
          headingProps.class,
        )}
        {...rest}
      >
        {parentChild.children}
      </h6>
    );
  }

  return (
    <h1
      class={cx(
        text({ size: headingProps.size, variant: headingProps.variant }),
        headingProps.class,
      )}
      {...rest}
    >
      {parentChild.children}
    </h1>
  );
};

export default Heading;
