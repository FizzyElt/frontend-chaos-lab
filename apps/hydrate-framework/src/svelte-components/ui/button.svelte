<script lang="ts">
  import { type SvelteHTMLElements } from 'svelte/elements';
  import { type ButtonVariantProps, button } from '../../../styled-system/recipes/button';

  let { children, variant, size, ...props }: SvelteHTMLElements['button'] & ButtonVariantProps =
    $props();
</script>

<button class={button({ size, variant })} {...props}>{@render children?.()}</button>
