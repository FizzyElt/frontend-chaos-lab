import {
  createShareValue,
  createShareValueWithAtom,
  createShareValueWithSignal,
} from "./bridge/share-store";

export const [globalCount, useGlobalCount] = createShareValue(0);

export const [globalJotaiCountAtom, globalJotaiCount] =
  createShareValueWithAtom(0);

export const {
  svelteWritableValue: signalGlobalCount,
  setSignalValue,
  signalValue,
  useShareStore
} = createShareValueWithSignal(0);
