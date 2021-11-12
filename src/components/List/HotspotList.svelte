<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  import {
    currentSceneKeyStore,
    hotspotConfigListStore,
    hotspotListEltStore,
  } from "~/stores";
  import HotspotItem from "./HotspotItem.svelte";

  let listElt: HTMLUListElement;

  $: currentSceneHotspotList = $hotspotConfigListStore.filter(
    (hotspotConfig) => hotspotConfig.scene_key === $currentSceneKeyStore
  );

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
    {#each currentSceneHotspotList as hotspotConfig}
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
