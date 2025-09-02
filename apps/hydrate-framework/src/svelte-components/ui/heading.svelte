<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cx } from '../../../styled-system/css';
  import { type TextVariantProps, text } from '../../../styled-system/recipes/text';

  interface HeadingProps extends HTMLAttributes<HTMLHeadElement>, TextVariantProps {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    class?: string;
  }

  const { children, variant, size, class: className, as = 'h1', ...props }: HeadingProps = $props();
</script>

{#if as === 'h1'}
  <h1 class={cx(text({ variant, size }), className)} {...props}>{@render children?.()}</h1>
{:else if as === 'h2'}
  <h2 class={cx(text({ variant, size }), className)} {...props}>{@render children?.()}</h2>
{:else if as === 'h3'}
  <h3 class={cx(text({ variant, size }), className)} {...props}>{@render children?.()}</h3>
{:else if as === 'h4'}
  <h4 class={cx(text({ variant, size }), className)} {...props}>{@render children?.()}</h4>
{:else if as === 'h5'}
  <h5 class={cx(text({ variant, size }), className)} {...props}>{@render children?.()}</h5>
{:else if as === 'h6'}
  <h6 class={cx(text({ variant, size }), className)} {...props}>{@render children?.()}</h6>
{/if}
