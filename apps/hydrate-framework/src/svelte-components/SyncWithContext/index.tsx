import { createSvelteComponentStore } from "../svelte-wrapper";
import SyncWithContext from "./SyncWithContext.svelte";

const ReactSyncWithContext = createSvelteComponentStore(SyncWithContext);

export default ReactSyncWithContext;
