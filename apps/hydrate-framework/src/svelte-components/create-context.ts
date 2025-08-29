import { getContext, setContext } from "svelte";

export const createContext = <T>(key: string) => {
  return [() => getContext<T>(key), (v: T) => setContext(key, v)] as const;
};

export const [getContextCount, setContextCount] =
  createContext<number>("context-count");
