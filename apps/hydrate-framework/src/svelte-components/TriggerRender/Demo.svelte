<script lang="ts">
  import svelteLogo from '../../assets/svelte.svg';
  import { globalCount, globalJotaiCount } from '../store';

  let { count, setCount }: { count: number; setCount: (updater: (v: number) => number) => void } =
    $props();

  let internalCount = $state(0);

  function incInternal() {
    internalCount = internalCount + 1;
  }

  const uid = $props.id();
</script>

<div class="card">
  <div>
    <div>
      <img src={svelteLogo} alt="" class="logo svelte" />
    </div>
    <h1>Svelte {uid}</h1>
    <h3>internal count {internalCount}</h3>
    <button onclick={incInternal}>inc internal</button>
  </div>

  <div>
    <h3>globalJotaiCount count {$globalJotaiCount}</h3>
    <button onclick={() => globalJotaiCount.update((p) => p + 1)}>inc globalJotaiCount</button>
  </div>

  <div>
    <h3>globalCount count {$globalCount}</h3>
    <button onclick={() => globalCount.update((p) => p + 1)}>inc globalCount</button>
  </div>

  <div>
    <h3>props count {count}</h3>
    <button onclick={() => setCount((p) => p + 1)}>inc prop</button>
  </div>
</div>

<style>
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
</style>
