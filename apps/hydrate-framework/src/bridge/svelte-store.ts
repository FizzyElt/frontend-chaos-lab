import { atom } from "jotai";
import { type SetStateAction, useCallback, useSyncExternalStore } from "react";
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

    const set = useCallback((v: SetStateAction<T>) => {
      if (typeof v === "function") {
        return writableValue.update(v as Updater<T>);
      }

      return writableValue.set(v);
    }, []);

    return [value, set] as const;
  };

  return [writableValue, useStore] as const;
};

export const createShareValueWithAtom = <T>(value: T) => {
  const writableValue = writable(value);
  const valueAtom = atom(get(writableValue));

  valueAtom.onMount = (setAtom) => {
    setAtom(get(writableValue));

    return writableValue.subscribe((v) => {
      setAtom(v);
    });
  };

  const deAtom = atom(
    (get) => get(valueAtom),
    (_get, _set, update: SetStateAction<T>) => {
      if (typeof update === "function") {
        const updater = update as Updater<T>;
        writableValue.update(updater as Updater<T>);
        return;
      }
      writableValue.set(update);
    },
  );

  return [deAtom, writableValue] as const;
};
