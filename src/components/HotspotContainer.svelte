<script lang="ts">
  import HotspotWrapper from "./HotspotWrapper.svelte";
  import type { HotspotConfig } from "../utils/getConfig";
  import { currentSceneDataStore, sceneDataListStore } from "../stores";

  export let hotspotConfigList: HotspotConfig[];

  $: if ($sceneDataListStore) {
    /*
      Update hotspotConfig to make a new key based on the object
      since objects are only equal to themself.
     */
    hotspotConfigList = hotspotConfigList.map((hotspotConfig) => ({
      ...hotspotConfig,
    }));

    // Remove previous hotspots
    const hotspotCotainer = $currentSceneDataStore.scene.hotspotContainer();
    for (const hotspot of hotspotCotainer.listHotspots()) {
      hotspotCotainer.destroyHotspot(hotspot);
    }
  }
</script>

<div class="hotspot-container">
  {#each hotspotConfigList as hotspotConfig, i (hotspotConfig)}
    {@debug hotspotConfig}
    <HotspotWrapper {hotspotConfig} index={i} />
  {/each}
</div>
