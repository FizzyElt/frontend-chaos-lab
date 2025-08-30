import type { Readable } from "svelte/store";

export type ReactSvProps<Props extends Record<string, any>> = {
  props: Readable<Props>;
};
