// import "./App.css";
import { useAtom } from "jotai";
import { useState } from "react";
import { css } from "styled-system/css";
import { Button } from "~/components/ui/button";
import { Heading } from "~/components/ui/heading";
import { Text } from "~/components/ui/text";
import reactLogo from "./assets/react.svg";
import * as styles from "./style";
import Demo from "./svelte-components/Demo";
import {
  globalJotaiCountAtom,
  useGlobalCount,
} from "./svelte-components/store";
import TriggerRender from "./svelte-components/TriggerRender";

function App() {
  const [count, setCount] = useState(0);
  const [globalCount, setGlobalCount] = useGlobalCount();
  const [passCount, setPassCount] = useState(0);

  const [toggleSvComp, setToggleSvComp] = useState(true);
  const [toggleSvCompTwo, setToggleSvCompTwo] = useState(true);

  const [jotaiCount, setJotaiCount] = useAtom(globalJotaiCountAtom);

  const incInternal = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div
      className={css({
        display: "flex",
        justifyContent: "center",
        columnGap: "20px",
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
          <Text size="lg" className={css({ color: "white" })}>
            internal count {count}
          </Text>
          <Button onClick={incInternal}>inc internal</Button>
        </div>
        <div
          className={css(styles.centerBlock, {
            backgroundColor: "royalblue",
          })}
        >
          <Text size="lg" className={css({ color: "white" })}>
            jotai count {jotaiCount}
          </Text>
          <Button onClick={() => setJotaiCount((p) => p + 1)}>
            inc internal
          </Button>
        </div>
        <div
          className={css(styles.centerBlock, {
            backgroundColor: "teal",
          })}
        >
          <Text size="lg" className={css({ color: "white" })}>
            globalCount count {globalCount}
          </Text>
          <Button onClick={() => setGlobalCount((prev) => prev + 1)}>
            inc globalCount
          </Button>
        </div>
        <div
          className={css(styles.centerBlock, {
            backgroundColor: "red.dark.a5",
          })}
        >
          <Text size="lg" className={css({ color: "white" })}>
            props count {passCount}
          </Text>
          <Button onClick={() => setPassCount((prev) => prev + 1)}>
            inc props
          </Button>
        </div>
      </div>

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
    </div>
  );
}

export default App;
