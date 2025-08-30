import { useState } from "react";

import reactLogo from "./assets/react.svg";
import "./App.css";
import { atom, useAtom } from "jotai";

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
    <div className="wrapper">
      <div className="card">
        <div>
          <img src={reactLogo} className="logo react" alt="React logo" />
        </div>
        <h1>React</h1>
        <div>
          <h3>internal count {count}</h3>
          <button onClick={incInternal}>inc internal</button>
        </div>
        <div>
          <h3>jotai count {jotaiCount}</h3>
          <button onClick={() => setJotaiCount((p) => p + 1)}>
            inc internal
          </button>
        </div>
        <div>
          <h3>globalCount count {globalCount}</h3>
          <button onClick={() => setGlobalCount((prev) => prev + 1)}>
            inc globalCount
          </button>
        </div>
        <div>
          <h3>props count {passCount}</h3>
          <button onClick={() => setPassCount((prev) => prev + 1)}>
            inc props
          </button>
        </div>
      </div>

      <div style={{ width: "332px" }}>
        <button onClick={() => setToggleSvComp((p) => !p)}>toggle</button>
        {toggleSvComp ? (
          <Demo count={passCount} setCount={setPassCount} />
        ) : (
          false
        )}
      </div>

      <div style={{ width: "332px" }}>
        <button onClick={() => setToggleSvCompTwo((p) => !p)}>toggle</button>
        {toggleSvCompTwo ? (
          <TriggerRender count={passCount} setCount={setPassCount} />
        ) : null}
      </div>
    </div>
  );
}

export default App;
