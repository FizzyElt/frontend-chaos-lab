<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cx } from '../../../styled-system/css';
  import { type TextVariantProps, text } from '../../../styled-system/recipes/text';

  interface TextProps extends HTMLAttributes<HTMLParagraphElement>, TextVariantProps {
    class?: string;
  }

  const { children, variant, size, class: className, ...props }: TextProps = $props();
</script>

<p class={cx(text({ variant, size }), className)} {...props}>{@render children?.()}</p>
