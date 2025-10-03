import { atom } from "jotai";
import { type SetStateAction, useCallback, useSyncExternalStore } from "react";
import {
  type Accessor,
  createSignal,
  type ObservableObserver,
  observable,
  type Setter,
} from "solid-js";
import { get, type Subscriber, type Updater, writable } from "svelte/store";

export interface Observable<T> {
  subscribe(observer: ObservableObserver<T>): {
    unsubscribe(): void;
  };
  [Symbol.observable](): Observable<T>;
}

// svelte store base
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

// jotai base
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

// signal base
export const createShareValueWithSignal = <T>(
  value: T,
): {
  svelteWritableValue: Observable<T>;
  useShareStore: () => readonly [T, Setter<T>];
  signalValue: Accessor<T>;
  setSignalValue: Setter<T>;
} => {
  const [signalValue, setSignalValue] = createSignal(value);

  const observableSignalValue = observable(signalValue);

  const sub = (callback: Subscriber<T>) => {
    const unsub = observableSignalValue.subscribe(callback);

    return unsub.unsubscribe;
  };

  const getter = () => signalValue();

  const useStore = () => {
    const value = useSyncExternalStore(sub, getter);

    const set: Setter<T> = useCallback(setSignalValue, []);

    return [value, set] as const;
  };

  return {
    svelteWritableValue: observableSignalValue,
    useShareStore: useStore,
    signalValue,
    setSignalValue,
  };
};
