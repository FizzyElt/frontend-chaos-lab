import { memo, useLayoutEffect, useRef } from "react";
import { type Component, mount } from "svelte";
import { type Writable } from "svelte/store";
import { createBridgeValue } from "./store";

export const createSvelteComponent = <Props extends Record<string, any>>(
  component: Component<Props>,
) => {
  function SvComponent(props: Props) {
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      while (ref.current?.firstChild) {
        ref.current.firstChild.remove();
      }

      if (ref.current) {
        mount(component, { target: ref.current, props });
      }
    }, Object.values(props));

    return <div ref={ref}></div>;
  }

  SvComponent.displayName = component.name;

  return memo(SvComponent);
};

export const createSvelteComponentStore = <Props extends Record<string, any>>(
  component: Component<{ props: Writable<Props> }>,
) => {
  function SvComponent(props: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const propsRef = useRef(createBridgeValue(props));

    useLayoutEffect(() => {
      while (ref.current?.firstChild) {
        ref.current.firstChild.remove();
      }

      if (ref.current) {
        mount(component, {
          target: ref.current,
          props: { props: propsRef.current },
        });
      }
    }, []);

    useLayoutEffect(() => {
      propsRef.current.set(props);
    }, [props]);

    return <div ref={ref}></div>;
  }

  SvComponent.displayName = component.name;

  return memo(SvComponent);
};
