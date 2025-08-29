<script lang="ts">
  import { getContextCount, setContextCount } from '../create-context';

  setContextCount(0);

  let contextCount = getContextCount();

  function inc() {
    contextCount = contextCount + 1;
  }
</script>

<button onclick={inc}> update context count </button>
<div>context count {contextCount}</div>
