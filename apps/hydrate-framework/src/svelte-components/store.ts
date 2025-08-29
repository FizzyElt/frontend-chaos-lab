import { useSyncExternalStore } from "react";
import { get, type Subscriber, writable } from "svelte/store";

export const globalCount = writable(0);

export const sub = (callback: Subscriber<number>) => {
  const unsub = globalCount.subscribe(callback);

  return unsub;
};

export const getGlobalCount = () => get(globalCount);

export const createBridgeValue = <T>(value: T) => {
  const writableValue = writable(value);

  return writableValue;
};
