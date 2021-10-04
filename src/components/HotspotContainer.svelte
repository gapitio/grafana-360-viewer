<script lang="ts">
  import HotspotWrapper from "./HotspotWrapper.svelte";
  import type { HotspotConfig } from "../utils/getConfig";
  import type { SceneData } from "../utils/getSceneDataList";

  export let hotspotConfigList: HotspotConfig[];
  export let sceneDataList: SceneData[];
</script>

<div class="hotspot-container">
  {#each hotspotConfigList as hotspotConfig, i (hotspotConfig.hotspot_key)}
    <HotspotWrapper {hotspotConfig} {sceneDataList} index={i} />
  {/each}
</div>
