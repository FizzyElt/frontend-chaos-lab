/** @jsxImportSource solid-js */

import type { Dispatch, SetStateAction } from "react";
import { type Accessor, createSignal, from } from "solid-js";
import { type MountableElement, render } from "solid-js/web";
import { css } from "../../../styled-system/css";
import solidLogo from "../../assets/solid.svg";
import {
  setGlobalJotaiCount as setShareJotaiCount,
  setSignalValue as setShareSignalCount,
  globalCount as shareGlobalCount,
  globalJotaiCount as shareJotaiCount,
  signalValue as shareSignalCount,
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
        <Heading size="2xl">Solid</Heading>
      </div>

      <div
        class={css(styles.centerBlock, {
          backgroundColor: "gray.dark.a1",
        })}
      >
        <Heading as="h3" size="lg">
          internal count
        </Heading>
        <Heading as="h3" size="xl">
          {internalCount()}
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
        <Heading as="h3" size="lg">
          globalJotaiCount count
        </Heading>
        <Heading as="h3" size="xl">
          {globalJotaiCount()}
        </Heading>
        <Button size="sm" onclick={() => setShareJotaiCount((p) => p + 1)}>
          inc globalJotaiCount
        </Button>
      </div>

      <div
        class={css(styles.centerBlock, {
          backgroundColor: "teal",
        })}
      >
        <Heading as="h3" size="lg">
          globalCount count
        </Heading>
        <Heading as="h3" size="xl">
          {globalCount()}
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
        <Heading as="h3" size="lg">
          props count
        </Heading>
        <Heading as="h3" size="xl">
          {props().count}
        </Heading>
        <Button size="sm" onclick={() => props().setCount((prev) => prev + 1)}>
          inc prop
        </Button>
      </div>

      <div
        class={css(styles.centerBlock, {
          backgroundColor: "lime.5",
        })}
      >
        <Heading as="h3" size="lg">
          signal count
        </Heading>
        <Heading as="h3" size="xl">
          {shareSignalCount()}
        </Heading>
        <Button size="sm" onclick={() => setShareSignalCount((p) => p + 1)}>
          inc prop
        </Button>
      </div>
    </div>
  );
};

export default (target: MountableElement, props: Accessor<CountProps>) =>
  render(() => <Count props={props()} />, target);
