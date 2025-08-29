import { memo, useLayoutEffect, useRef } from "react";
import { type Component, mount } from "svelte";
import { type Readable, readonly, type Writable, writable } from "svelte/store";

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
  component: Component<{ props: Readable<Props> }>,
) => {
  function SvComponent(props: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const propsRef = useRef<Writable<Props> | null>(null);

    if (!propsRef.current) {
      propsRef.current = writable(props);
    }

    useLayoutEffect(() => {
      while (ref.current?.firstChild) {
        ref.current.firstChild.remove();
      }

      if (ref.current && propsRef.current) {
        mount(component, {
          target: ref.current,
          props: {
            props: readonly(propsRef.current),
          },
        });
      }
    }, []);

    useLayoutEffect(() => {
      propsRef.current?.set(props);
    }, [props]);

    return <div ref={ref}></div>;
  }

  SvComponent.displayName = component.name;

  return memo(SvComponent);
};
