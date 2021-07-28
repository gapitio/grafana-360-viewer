<script lang="ts">
  import {
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
        area_key: 3,
        color: "#531AAA",
        description: "",
        extra_transforms: "",
        go_to_scene_key: null,
        metric: "a-d-c",
        title: "Go to next scene",
        type: "metric",
        unit: "kW",
      };

      return [...e, newHotspotConfig];
    });
  }
  $: console.log($newHotspotStore);
</script>

<button on:click={onClick}>New hotspot</button>

<style>
  button {
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>
