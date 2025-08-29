<script lang="ts">
  import { globalCount } from '../store';
  import { type DemoProps } from '../type';

  let { count }: DemoProps = $props();

  const inc = () => {
    $globalCount = $globalCount + 1;
  };
</script>

<div>svelte hello world {count}</div>
<button onclick={inc}>update global count</button>
<div>global Count {$globalCount}</div>
