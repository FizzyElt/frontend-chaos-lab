import { memo, useEffect, useLayoutEffect, useRef } from "react";
import { type Component, mount } from "svelte";
import { readonly, type Writable, writable } from "svelte/store";
import { type ReactSvProps } from "./type";

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

    // tracking
    useLayoutEffect(() => {
      const observer = new window.MutationObserver((records) => {
        console.log("with props deps", records);
      });

      if (ref.current) {
        return observer.observe(ref.current, {
          subtree: true,
          childList: true,
          attributes: true,
        });
      }
    }, []);

    return <div ref={ref}></div>;
  }

  SvComponent.displayName = component.name;

  return memo(SvComponent);
};

export const createSvelteComponentStore = <Props extends Record<string, any>>(
  component: Component<ReactSvProps<Props>>,
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

    // tracking
    useLayoutEffect(() => {
      const observer = new window.MutationObserver((records) => {
        console.log("with svelte store", records);
      });

      if (ref.current) {
        return observer.observe(ref.current, {
          subtree: true,
          childList: true,
          attributes: true,
        });
      }
    }, []);

    return <div ref={ref}></div>;
  }

  SvComponent.displayName = component.name;

  return memo(SvComponent);
};
