<script lang="ts">
  import {
    currentAreaKeyStore,
    currentSceneKeyStore,
    hotspotConfigListStore,
    newHotspotStore,
  } from "../stores";
  import type { HotspotConfig } from "../utils/getConfig";

  const defaultConfig = {
    yaw: 0,
    pitch: 0,
  };

  function onClick() {
    newHotspotStore.update((e) => {
      const hotspotKeysList = $hotspotConfigListStore.map((e) => e.hotspot_key);
      const newHotspotNumber =
        hotspotKeysList.length > 0 ? Math.max(...hotspotKeysList) + 1 : 1;

      const newHotspotConfig: HotspotConfig = {
        ...defaultConfig,
        hotspot_key: newHotspotNumber,
        scene_key: $currentSceneKeyStore,
        area_key: $currentAreaKeyStore,
        color: null,
        description: null,
        extra_transforms: null,
        go_to_scene_key: null,
        metric: null,
        title: null,
        type: null,
        unit: null,
        link: null,
      };

      return [...e, newHotspotConfig];
    });
  }
</script>

<button on:click={onClick}>New hotspot</button>

<style>
</style>
