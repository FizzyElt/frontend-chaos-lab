import { createSvelteComponent } from "../svelte-wrapper";
import Demo from "./Demo.svelte";

const ReactDemo = createSvelteComponent(Demo, "Demo");

export default ReactDemo;
