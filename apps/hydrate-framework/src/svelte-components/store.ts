import {
  createShareValue,
  createShareValueWithAtom,
} from "../bridge/svelte-store";

export const [globalCount, useGlobalCount] = createShareValue(0);

export const [globalJotaiCountAtom, globalJotaiCount] =
  createShareValueWithAtom(0);
