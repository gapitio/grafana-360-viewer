<script lang="ts">
  import DataHotspot from "./hotspots/DataHotspot.svelte";
  import InfoHotspot from "./hotspots/InfoHotspot.svelte";
  import SceneHotspot from "./hotspots/SceneHotspot.svelte";
  import GrafanaData from "./Data/GrafanaData.svelte";
  import DraggableHotspot from "./DraggableHotspot.svelte";
  import type { HotspotConfig } from "../utils/getConfig";

  export let hotspotConfig: HotspotConfig;
  export let currentSceneKey: number;
  export let viewer: any;
  export let scenes: { name: string; key: number; scene: any }[] = [];

  let hotspot: any;

  function findScene(sceneKey: number) {
    const scene = scenes.find((scene) => scene.key == sceneKey);
    if (!scene) throw new Error(`Found no scene with key ${sceneKey}`);

    return scenes.find((scene) => scene.key == sceneKey);
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

<div
  data-scene-key={hotspotConfig.scene_key}
  data-hotspot-key={hotspotConfig.hotspot_key}
  use:addHotspot
  data-yaw={hotspotConfig.yaw}
  data-pitch={hotspotConfig.pitch}
  data-extra-transforms={hotspotConfig.extra_transforms}
>
  {#if hotspot}
    <DraggableHotspot {viewer} {hotspot}>
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
          func={() => {
            currentSceneKey = hotspotConfig.go_to_scene_key;
          }}
        />
      {:else if hotspotConfig.type == "info"}
        <InfoHotspot />
      {/if}
    </DraggableHotspot>
  {/if}
</div>
