import { useState } from "react";

import reactLogo from "./assets/react.svg";
import "./App.css";
import Demo from "./svelte-components/Demo";
import { useGlobalCount } from "./svelte-components/store";
import TriggerRender from "./svelte-components/TriggerRender";

function App() {
  const [count, setCount] = useState(0);
  const [globalCount, setGlobalCount] = useGlobalCount();
  const [passCount, setPassCount] = useState(0);
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

      <Demo count={passCount} setCount={setPassCount} />
      <TriggerRender count={passCount} setCount={setPassCount} />
    </div>
  );
}

export default App;
