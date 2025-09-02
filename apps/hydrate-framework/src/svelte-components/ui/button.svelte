<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { type ButtonVariantProps, button } from '../../../styled-system/recipes/button';

  interface ButtonProps extends HTMLButtonAttributes, ButtonVariantProps {}

  const { children, variant, size, ...props }: ButtonProps = $props();
</script>

<button class={button({ size, variant })} {...props}>{@render children?.()}</button>
