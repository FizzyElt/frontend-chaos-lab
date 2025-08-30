<script lang="ts">
  import Count from '../Count/Count.svelte';

  let { count, setCount }: { count: number; setCount: (updater: (v: number) => number) => void } =
    $props();
</script>

<Count {count} {setCount} />
