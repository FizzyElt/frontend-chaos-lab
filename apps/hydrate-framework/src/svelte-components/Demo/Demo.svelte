<script lang="ts">
  import Count from '../Count/Count.svelte';
  import type { ReactSvProps } from '../type';

  const {
    props: cprops,
  }: ReactSvProps<{
    count: number;
    setCount: (updater: (v: number) => number) => void;
  }> = $props();

  const { count, setCount } = $derived($cprops);
</script>

<Count {count} {setCount} />
