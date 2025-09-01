<script lang="ts">
  import { css } from '../../../styled-system/css';
  import svelteLogo from '../../assets/svelte.svg';
  import * as styles from '../../style';
  import { globalCount, globalJotaiCount } from '../store';
  import Button from '../ui/button.svelte';
  import Heading from '../ui/heading.svelte';

  type Props = {
    count: number;
    setCount: (updater: (v: number) => number) => void;
  };

  const { count, setCount }: Props = $props();

  let internalCount = $state(0);

  function incInternal() {
    internalCount = internalCount + 1;
  }

  const uid = $props.id();
</script>

<div class={styles.card}>
  <div class={styles.center}>
    <img
      src={svelteLogo}
      alt=""
      class={css(styles.logo, {
        _hover: {
          filter: 'drop-shadow(0 0 2em #ff3e00aa)',
        },
      })}
    />
    <Heading size="2xl" class={css({ color: 'white' })}>Svelte {uid}</Heading>
  </div>

  <div
    class={css(styles.centerBlock, {
      backgroundColor: 'gray.dark.a1',
    })}
  >
    <Heading as="h3" size="lg" class={css({ color: 'white' })}
      >internal count {internalCount}</Heading
    >
    <Button size="sm" onclick={incInternal}>inc internal</Button>
  </div>

  <div
    class={css(styles.centerBlock, {
      backgroundColor: 'royalblue',
    })}
  >
    <Heading as="h3" size="lg" class={css({ color: 'white' })}
      >globalJotaiCount count {$globalJotaiCount}</Heading
    >
    <Button size="sm" onclick={() => globalJotaiCount.update((p) => p + 1)}
      >inc globalJotaiCount</Button
    >
  </div>

  <div
    class={css(styles.centerBlock, {
      backgroundColor: 'teal',
    })}
  >
    <Heading as="h3" size="lg" class={css({ color: 'white' })}
      >globalCount count {$globalCount}</Heading
    >
    <Button size="sm" onclick={() => globalCount.update((p) => p + 1)}>inc globalCount</Button>
  </div>

  <div
    class={css(styles.centerBlock, {
      backgroundColor: 'red.dark.a5',
    })}
  >
    <Heading as="h3" size="lg" class={css({ color: 'white' })}>props count {count}</Heading>
    <Button size="sm" onclick={() => setCount((p) => p + 1)}>inc prop</Button>
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
