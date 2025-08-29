<script lang="ts">
  import { type Writable } from 'svelte/store';

  let {
    props: reactiveProps,
  }: { props: Writable<{ count: number; setCount: (v: number) => void }> } = $props();

  function inc() {
    $reactiveProps.setCount($reactiveProps.count + 1);
  }
</script>

<button onclick={inc}> update store prop count </button>
<div>store prop count {$reactiveProps.count}</div>
