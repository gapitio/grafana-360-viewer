<script lang="ts">
  import HotspotWrapper from "./HotspotWrapper.svelte";
  import type { HotspotConfig } from "../utils/getConfig";
  import { currentSceneKeyStore } from "../stores";
  import type { SceneData } from "../utils/getSceneDataList";

  export let hotspotConfigList: HotspotConfig[];
  export let sceneDataList: SceneData[];

  async function removePreviousHotspots() {
    const scene = sceneDataList.find(
      (scene) => scene.key == $currentSceneKeyStore
    );
    const hotspotCotainer = scene?.scene.hotspotContainer();
    if (hotspotCotainer) {
      for (const hotspot of hotspotCotainer.listHotspots()) {
        hotspotCotainer.destroyHotspot(hotspot);
      }
    }
  }

  $: if (sceneDataList) {
    /*
      Update hotspotConfig to make a new key based on the object
      since objects are only equal to themself.
     */
    hotspotConfigList = hotspotConfigList.map((hotspotConfig) => ({
      ...hotspotConfig,
    }));

    removePreviousHotspots();
  }
</script>

<div class="hotspot-container">
  {#each hotspotConfigList as hotspotConfig, i (hotspotConfig)}
    <HotspotWrapper {hotspotConfig} {sceneDataList} index={i} />
  {/each}
</div>
