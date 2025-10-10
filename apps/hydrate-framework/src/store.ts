import {
  createShareValue,
  createShareValueWithAtom,
  createShareValueWithSignal,
} from "./bridge/share-store";
import { jotaiStore } from "./jotai-store";

export const [globalCount, useGlobalCount] = createShareValue(0);

export const [globalJotaiCountAtom, globalJotaiCount, setGlobalJotaiCount] =
  createShareValueWithAtom(0, jotaiStore);

export const {
  svelteWritableValue: signalGlobalCount,
  setSignalValue,
  signalValue,
  useShareStore,
} = createShareValueWithSignal(0);
