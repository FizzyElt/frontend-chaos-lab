import { atom, createStore } from "jotai";
import { type SetStateAction, useSyncExternalStore } from "react";
import {
  type Accessor,
  createSignal,
  type ObservableObserver,
  observable,
  type Setter,
} from "solid-js";
import {
  get,
  type Readable,
  type Subscriber,
  type Updater,
  writable,
} from "svelte/store";

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

  const getter =
    <R>(selector?: (v: T) => R) =>
    () => {
      const value = get(writableValue);

      if (selector) {
        return selector(value);
      }

      return value;
    };

  const setValue = (v: SetStateAction<T>) => {
    if (typeof v === "function") {
      return writableValue.update(v as Updater<T>);
    }

    return writableValue.set(v);
  };

  function useStore(): [T, (v: SetStateAction<T>) => void];
  function useStore<R>(
    selector: (v: T) => R,
  ): [R, (v: SetStateAction<T>) => void];
  function useStore<R>(selector?: (v: T) => R) {
    const value = useSyncExternalStore(sub, getter(selector));

    return [value, setValue] as const;
  }

  return [writableValue, useStore] as const;
};

// jotai base
export const createShareValueWithAtom = <T>(
  value: T,
  store: ReturnType<typeof createStore>,
) => {
  const valueAtom = atom(value);

  const shareValue: Readable<T> = {
    subscribe: (sub: Subscriber<T>) => {
      sub(store.get(valueAtom));
      return store.sub(valueAtom, () => sub(store.get(valueAtom)));
    },
  };

  const setValue = (f: SetStateAction<T>) => store.set(valueAtom, f);

  return [valueAtom, shareValue, setValue] as const;
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

  const getter =
    <R>(selector?: (v: T) => R) =>
    () => {
      const value = signalValue();

      if (selector) {
        return selector(value);
      }

      return value;
    };

  function useStore(): [T, Setter<T>];
  function useStore<R>(selector: (v: T) => R): [R, Setter<T>];
  function useStore<R>(selector?: (v: T) => R) {
    const value = useSyncExternalStore(sub, getter(selector));

    return [value, setSignalValue] as const;
  }

  return {
    svelteWritableValue: observableSignalValue,
    useShareStore: useStore,
    signalValue,
    setSignalValue,
  };
};
