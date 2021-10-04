<script lang="ts">
  import { currentAreaKeyStore, areaConfigListEditsStore } from "~/stores";
  import AreaItem from "./AreaItem.svelte";

  $: selectedArea = $areaConfigListEditsStore.find(
    (sceneConfig) => sceneConfig.area_key == $currentAreaKeyStore
  )
    ? $currentAreaKeyStore
    : null;
</script>

<div>
  <ul>
    {#each $areaConfigListEditsStore as areaConfig}
      <AreaItem bind:selectedArea {areaConfig} />
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
