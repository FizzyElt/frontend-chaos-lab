import { memo, useLayoutEffect, useRef } from "react";
import { type Accessor, createSignal, type Setter } from "solid-js";
import type { MountableElement } from "solid-js/web";

export const createSolidComponent = <Props extends Record<string, any>>(
  renderComponent: (target: MountableElement, props: Accessor<Props>) => void,
) => {
  function SolidComponent(props: Props) {
    const signalRef = useRef<Accessor<Props> | null>(null);
    const setSignalRef = useRef<Setter<Props> | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    if (!signalRef.current || !setSignalRef.current) {
      const [propsSignal, setPropsSignal] = createSignal(props);
      signalRef.current = propsSignal;
      setSignalRef.current = setPropsSignal;
    }

    useLayoutEffect(() => {
      while (ref.current?.firstChild) {
        ref.current.firstChild.remove();
      }

      if (ref.current && signalRef.current) {
        renderComponent(ref.current, signalRef.current);
      }
    }, []);

    useLayoutEffect(() => {
      if (setSignalRef.current) {
        setSignalRef.current(() => props);
      }
    }, [props]);

    return <div ref={ref}></div>;
  }

  return memo(SolidComponent);
};
