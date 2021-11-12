<script lang="ts">
  import {
    currentAreaKeyStore,
    currentSceneKeyStore,
    hotspotConfigListStore,
    newHotspotStore,
    viewerStore,
  } from "~/stores";
  import type { HotspotConfig } from "~/utils/getConfig";

  function onClick() {
    newHotspotStore.update((e) => {
      const hotspotKeysList = $hotspotConfigListStore
        .filter((e) => typeof e.hotspot_key === "string")
        .map((e) => Number(String(e.hotspot_key).replace("new", "")));
      const newHotspotNumber =
        hotspotKeysList.length > 0 ? Math.max(...hotspotKeysList) + 1 : 1;

      const newHotspotConfig: HotspotConfig = {
        hotspot_key: "new" + newHotspotNumber,
        scene_key: $currentSceneKeyStore,
        area_key: $currentAreaKeyStore,
        yaw: $viewerStore.view().yaw(),
        pitch: $viewerStore.view().pitch(),
        color: null,
        description: null,
        extra_transforms: null,
        go_to_scene_key: null,
        metric: null,
        title: null,
        type: null,
        unit: null,
        decimals: null,
        link: null,
      };

      return [...e, newHotspotConfig];
    });
  }
</script>

<button on:click={onClick}>New hotspot</button>

<style>
  button {
    width: 100%;
  }
</style>
