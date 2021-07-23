<script lang="ts">
  import DataHotspot from "./hotspots/DataHotspot.svelte";
  import InfoHotspot from "./hotspots/InfoHotspot.svelte";
  import SceneHotspot from "./hotspots/SceneHotspot.svelte";
  import GrafanaData from "./Data/GrafanaData.svelte";
  import DraggableHotspot from "./DraggableHotspot.svelte";
  import type { HotspotConfig } from "../utils/getConfig";
  import { currentSceneKeyStore, sceneDataListStore } from "../stores";

  export let hotspotConfig: HotspotConfig;
  export let index: number;

  let hotspot: any;
  let hotspotElement: HTMLDivElement;

  function findScene(sceneKey: number) {
    const scene = $sceneDataListStore.find((scene) => scene.key == sceneKey);
    if (!scene) throw new Error(`Found no scene with key ${sceneKey}`);

    return scene;
  }

  function addHotspot(hotspotElement: HTMLElement) {
    const sceneKey = hotspotElement.dataset.sceneKey;

    if (!sceneKey) {
      console.warn("Missing scene key on", hotspotElement);
      return;
    }

    const scene = findScene(Number(sceneKey));

    hotspot = scene.scene.hotspotContainer().createHotspot(
      hotspotElement,
      {
        yaw: Number(hotspotElement.dataset.yaw),
        pitch: Number(hotspotElement.dataset.pitch),
      },
      {
        perspective: {
          extraTransforms: hotspotElement.dataset.extraTransforms,
        },
      }
    );
  }
</script>

<div class="wrapper">
  <div
    data-scene-key={hotspotConfig.scene_key}
    data-hotspot-key={hotspotConfig.hotspot_key}
    use:addHotspot
    data-yaw={hotspotConfig.yaw}
    data-pitch={hotspotConfig.pitch}
    data-extra-transforms={hotspotConfig.extra_transforms}
    style="z-index: {index};"
    bind:this={hotspotElement}
  >
    {#if hotspot}
      <DraggableHotspot {hotspot}>
        {#if hotspotConfig.type == "metric"}
          <DataHotspot
            title={hotspotConfig.title}
            color={hotspotConfig.color}
            unit={hotspotConfig.unit}
            value={"No data"}
          >
            <tspan slot="title">{hotspotConfig.title}</tspan>
            <tspan slot="value">
              <GrafanaData alias={hotspotConfig.metric} />
            </tspan>
          </DataHotspot>
        {:else if hotspotConfig.type == "scene"}
          <SceneHotspot
            func={() =>
              currentSceneKeyStore.setKey(hotspotConfig.go_to_scene_key)}
          />
        {:else if hotspotConfig.type == "info"}
          <InfoHotspot />
        {/if}
      </DraggableHotspot>
    {/if}
  </div>
</div>

<style>
  .wrapper {
    display: none;
  }
</style>
