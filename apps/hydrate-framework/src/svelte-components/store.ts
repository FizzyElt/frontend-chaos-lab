import { useCallback, useSyncExternalStore } from "react";
import { get, type Subscriber, type Updater, writable } from "svelte/store";

export const createShareValue = <T>(value: T) => {
  const writableValue = writable(value);
  const sub = (callback: Subscriber<T>) => {
    const unsub = writableValue.subscribe(callback);

    return unsub;
  };

  const getter = () => get(writableValue);

  const useStore = () => {
    const value = useSyncExternalStore(sub, getter);

    const set = useCallback((v: T | Updater<T>) => {
      if (typeof v === "function") {
        return writableValue.update(v as Updater<T>);
      }

      return writableValue.set(v);
    }, []);

    return [value, set] as const;
  };
  return [writableValue, sub, getter, useStore] as const;
};

export const [globalCount, sub, getter, useGlobalCount] = createShareValue(0);
