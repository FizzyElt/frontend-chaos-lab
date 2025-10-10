import { useAtom } from "jotai";
import { useState } from "react";
import { css } from "styled-system/css";
import { Button } from "~/components/ui/button";
import { Heading } from "~/components/ui/heading";
import { Text } from "~/components/ui/text";
import reactLogo from "./assets/react.svg";
import Count from "./solid-components/Count";
import {
  globalJotaiCountAtom,
  useGlobalCount,
  useShareStore as useSignalShareStore,
} from "./store";
import * as styles from "./style";
import Demo from "./svelte-components/Demo";

import TriggerRender from "./svelte-components/TriggerRender";

function App() {
  const [count, setCount] = useState(0);
  const [globalCount, setGlobalCount] = useGlobalCount();
  const [signalShareCount, setSignalShareCount] = useSignalShareStore();
  const [passCount, setPassCount] = useState(0);

  const [toggleSvComp, setToggleSvComp] = useState(true);
  const [toggleSvCompTwo, setToggleSvCompTwo] = useState(true);
  const [toggleSolidComp, setToggleSolidComp] = useState(true);
  const [sw, setSw] = useState<"svelte" | "svelte-plus" | "solid">("svelte");

  const [jotaiCount, setJotaiCount] = useAtom(globalJotaiCountAtom);

  const incInternal = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div className={css({})}>
      <nav
        className={css({
          display: "flex",
          gap: "10px",
          my: "20px",
          justifyContent: "center",
        })}
      >
        <Text
          size="lg"
          cursor="pointer"
          color={sw === "svelte" ? "lime.dark.a12" : undefined}
          fontWeight={sw === "svelte" ? "bold" : undefined}
          textDecoration="underline"
          onClick={() => setSw("svelte")}
        >
          svelte
        </Text>
        <Text
          size="lg"
          cursor="pointer"
          color={sw === "svelte-plus" ? "lime.dark.a12" : undefined}
          fontWeight={sw === "svelte-plus" ? "bold" : undefined}
          textDecoration="underline"
          onClick={() => setSw("svelte-plus")}
        >
          svelte plus
        </Text>
        <Text
          size="lg"
          cursor="pointer"
          color={sw === "solid" ? "lime.dark.a12" : undefined}
          fontWeight={sw === "solid" ? "bold" : undefined}
          textDecoration="underline"
          onClick={() => setSw("solid")}
        >
          solid
        </Text>
      </nav>
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          columnGap: "20px",
          flexWrap: "wrap",
        })}
      >
        <div className={styles.card}>
          <div className={styles.center}>
            <img
              src={reactLogo}
              className={css(styles.logo, {
                _hover: {
                  filter: "drop-shadow(0 0 1em #9fa5ffd8)",
                },
              })}
              alt="React logo"
            />
            <Heading as="h1" size="3xl" color="white">
              React
            </Heading>
          </div>
          <div
            className={css(styles.centerBlock, {
              backgroundColor: "gray.dark.a1",
            })}
          >
            <Heading size="lg" className={css({ color: "white" })}>
              internal count{" "}
            </Heading>
            <Heading size="xl">{count}</Heading>
            <Button onClick={incInternal}>inc internal</Button>
          </div>
          <div
            className={css(styles.centerBlock, {
              backgroundColor: "royalblue",
            })}
          >
            <Heading size="lg" className={css({ color: "white" })}>
              jotai count
            </Heading>
            <Heading size="xl">{jotaiCount}</Heading>
            <Button onClick={() => setJotaiCount((p) => p + 1)}>
              inc jotai
            </Button>
          </div>
          <div
            className={css(styles.centerBlock, {
              backgroundColor: "teal",
            })}
          >
            <Heading size="lg" className={css({ color: "white" })}>
              globalCount count
            </Heading>
            <Heading size="xl">{globalCount}</Heading>
            <Button onClick={() => setGlobalCount((prev) => prev + 1)}>
              inc globalCount
            </Button>
          </div>
          <div
            className={css(styles.centerBlock, {
              backgroundColor: "red.dark.a5",
            })}
          >
            <Heading size="lg" className={css({ color: "white" })}>
              props count
            </Heading>
            <Heading size="xl">{passCount}</Heading>
            <Button onClick={() => setPassCount((prev) => prev + 1)}>
              inc props
            </Button>
          </div>

          <div
            className={css(styles.centerBlock, {
              backgroundColor: "lime.5",
            })}
          >
            <Heading as="h3" size="lg" className={css({ color: "white" })}>
              signal count
            </Heading>
            <Heading size="xl">{signalShareCount}</Heading>
            <Button size="sm" onClick={() => setSignalShareCount((p) => p + 1)}>
              inc prop
            </Button>
          </div>
        </div>

        {sw === "svelte-plus" && (
          <div
            className={css({
              width: "332px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            })}
          >
            <Button size="sm" onClick={() => setToggleSvComp((p) => !p)}>
              toggle
            </Button>
            {toggleSvComp ? (
              <Demo count={passCount} setCount={setPassCount} />
            ) : (
              false
            )}
          </div>
        )}

        {sw === "svelte" && (
          <div
            className={css({
              width: "332px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            })}
          >
            <Button size="sm" onClick={() => setToggleSvCompTwo((p) => !p)}>
              toggle
            </Button>
            {toggleSvCompTwo ? (
              <TriggerRender count={passCount} setCount={setPassCount} />
            ) : null}
          </div>
        )}
        {sw === "solid" && (
          <div
            className={css({
              width: "332px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            })}
          >
            <Button size="sm" onClick={() => setToggleSolidComp((p) => !p)}>
              toggle
            </Button>
            {toggleSolidComp ? (
              <Count count={passCount} setCount={setPassCount} />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
