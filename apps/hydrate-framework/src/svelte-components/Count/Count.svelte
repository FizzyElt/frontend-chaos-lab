<script lang="ts">
  import { css } from '../../../styled-system/css';
  import svelteLogo from '../../assets/svelte.svg';
  import {
    globalCount,
    globalJotaiCount,
    setGlobalJotaiCount,
    setSignalValue,
    signalGlobalCount,
  } from '../../store';
  import * as styles from '../../style';
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
          filter: 'drop-shadow(0 0 1em #ff3e00aa)',
        },
      })}
    />
    <Heading size="2xl">Svelte {uid}</Heading>
  </div>

  <div
    class={css(styles.centerBlock, {
      backgroundColor: 'gray.dark.a1',
    })}
  >
    <Heading as="h3" size="lg">internal count</Heading>
    <Heading as="h3" size="xl">{internalCount}</Heading>
    <Button size="sm" onclick={incInternal}>inc internal</Button>
  </div>

  <div
    class={css(styles.centerBlock, {
      backgroundColor: 'royalblue',
    })}
  >
    <Heading as="h3" size="lg">globalJotaiCount count</Heading>
    <Heading as="h3" size="xl">{$globalJotaiCount}</Heading>
    <Button size="sm" onclick={() => setGlobalJotaiCount((p) => p + 1)}>inc globalJotaiCount</Button
    >
  </div>

  <div
    class={css(styles.centerBlock, {
      backgroundColor: 'teal',
    })}
  >
    <Heading as="h3" size="lg">globalCount count</Heading>
    <Heading as="h3" size="xl">{$globalCount}</Heading>
    <Button size="sm" onclick={() => globalCount.update((p) => p + 1)}>inc globalCount</Button>
  </div>

  <div
    class={css(styles.centerBlock, {
      backgroundColor: 'red.dark.a5',
    })}
  >
    <Heading as="h3" size="lg">props count</Heading>
    <Heading as="h3" size="xl">{count}</Heading>
    <Button size="sm" onclick={() => setCount((p) => p + 1)}>inc prop</Button>
  </div>
  <div
    class={css(styles.centerBlock, {
      backgroundColor: 'lime.5',
    })}
  >
    <Heading as="h3" size="lg">signal count</Heading>
    <Heading as="h3" size="xl">{$signalGlobalCount}</Heading>
    <Button size="sm" onclick={() => setSignalValue((p) => p + 1)}>inc prop</Button>
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
