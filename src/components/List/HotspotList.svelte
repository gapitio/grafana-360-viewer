<script lang="ts">
  import { hotspotConfigListStore } from "../../stores";
  import HotspotItem from "./HotspotItem.svelte";
</script>

<div>
  <ul>
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
