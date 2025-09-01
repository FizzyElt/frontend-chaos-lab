<script lang="ts">
  import { type SvelteHTMLElements } from 'svelte/elements';
  import { cx } from '../../../styled-system/css';
  import { type TextVariantProps, text } from '../../../styled-system/recipes/text';

  let {
    children,
    variant,
    size,
    class: className,
    ...props
  }: SvelteHTMLElements['p'] & TextVariantProps & { class?: string } = $props();
</script>

<p class={cx(text({ variant, size }), className)} {...props}>{@render children?.()}</p>
