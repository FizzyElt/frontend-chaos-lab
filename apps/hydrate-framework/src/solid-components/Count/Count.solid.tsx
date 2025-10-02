/** @jsxImportSource solid-js */

import type { Dispatch, SetStateAction } from "react";
import { type Accessor, createSignal, from } from "solid-js";
import { type MountableElement, render } from "solid-js/web";
import { css } from "../../../styled-system/css";
import solidLogo from "../../assets/solid.svg";
import {
  globalCount as shareGlobalCount,
  globalJotaiCount as shareJotaiCount,
} from "../../store";
import * as styles from "../../style";
import { type ReactSolidProps } from "../types";
import Button from "../ui/button.solid";
import Heading from "../ui/heading.solid";

export interface CountProps {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}

const Count = (wrappedProps: ReactSolidProps<CountProps>) => {
  const [internalCount, setInternalCount] = createSignal(0);

  const incInternal = () => {
    setInternalCount((prev) => prev + 1);
  };

  const globalCount = from(shareGlobalCount);
  const globalJotaiCount = from(shareJotaiCount);

  const props = () => wrappedProps.props;

  return (
    <div class={styles.card}>
      <div class={styles.center}>
        <img
          src={solidLogo}
          alt=""
          class={css(styles.logo, {
            _hover: {
              filter: "drop-shadow(0 0 2em #646cffaa)",
            },
          })}
        />
        <Heading size="2xl" class={css({ color: "white" })}>
          Solid
        </Heading>
      </div>

      <div
        class={css(styles.centerBlock, {
          backgroundColor: "gray.dark.a1",
        })}
      >
        <Heading as="h3" size="lg" class={css({ color: "white" })}>
          internal count {internalCount()}
        </Heading>
        <Button size="sm" onclick={incInternal}>
          inc internal
        </Button>
      </div>

      <div
        class={css(styles.centerBlock, {
          backgroundColor: "royalblue",
        })}
      >
        <Heading as="h3" size="lg" class={css({ color: "white" })}>
          globalJotaiCount count {globalJotaiCount()}
        </Heading>
        <Button size="sm" onclick={() => shareJotaiCount.update((p) => p + 1)}>
          inc globalJotaiCount
        </Button>
      </div>

      <div
        class={css(styles.centerBlock, {
          backgroundColor: "teal",
        })}
      >
        <Heading as="h3" size="lg" class={css({ color: "white" })}>
          globalCount count {globalCount()}
        </Heading>
        <Button size="sm" onclick={() => shareGlobalCount.update((p) => p + 1)}>
          inc globalCount
        </Button>
      </div>

      <div
        class={css(styles.centerBlock, {
          backgroundColor: "red.dark.a5",
        })}
      >
        <Heading as="h3" size="lg" class={css({ color: "white" })}>
          props count {props().count}
        </Heading>
        <Button size="sm" onclick={() => props().setCount((prev) => prev + 1)}>
          inc prop
        </Button>
      </div>
    </div>
  );
};

export default (target: MountableElement, props: Accessor<CountProps>) =>
  render(() => <Count props={props()} />, target);
