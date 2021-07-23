<script lang="ts">
  import HotspotWrapper from "./HotspotWrapper.svelte";
  import type { HotspotConfig } from "../utils/getConfig";
  import { sceneDataListStore } from "../stores";

  export let hotspotConfigList: HotspotConfig[];

  $: if ($sceneDataListStore) {
    /*
      Update hotspotConfig to make a new key based on the object
      since objects are only equal to themself.
     */
    hotspotConfigList = hotspotConfigList.map((hotspotConfig) => ({
      ...hotspotConfig,
    }));
  }
</script>

<div class="hotspot-container">
  {#each hotspotConfigList as hotspotConfig, i (hotspotConfig)}
    <HotspotWrapper {hotspotConfig} index={i} />
  {/each}
</div>
