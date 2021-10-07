<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  import { hotspotConfigListStore, hotspotListEltStore } from "~/stores";
  import HotspotItem from "./HotspotItem.svelte";

  let listElt: HTMLUListElement;

  onMount(() => {
    hotspotListEltStore.set([...$hotspotListEltStore, listElt]);
  });

  onDestroy(() => {
    hotspotListEltStore.set(
      $hotspotListEltStore.filter((elt) => elt !== listElt)
    );
  });
</script>

<div>
  <ul bind:this={listElt}>
    {#each $hotspotConfigListStore as hotspotConfig}
      <HotspotItem {hotspotConfig} />
    {/each}
  </ul>
</div>

<style>
  div {
    color: #fcfcfc;
    overflow-y: auto;
    flex: 1;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>
