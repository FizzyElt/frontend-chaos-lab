import { createSvelteComponentStore } from "../svelte-wrapper";
import Demo from "./Demo.svelte";

const ReactDemo = createSvelteComponentStore(Demo);

export default ReactDemo;
