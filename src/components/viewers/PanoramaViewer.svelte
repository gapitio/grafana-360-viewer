<script lang="ts">
  import DataHotspot from "../hotspots/DataHotspot.svelte";
  import InfoHotspot from "../hotspots/InfoHotspot.svelte";
  import SceneHotspot from "../hotspots/SceneHotspot.svelte";
  import { onMount } from "svelte";
  import Marzipano from "marzipano";
  import GrafanaData from "../Data/GrafanaData.svelte";
  import { dataStore } from "../../stores";
  import type { Config } from "../../utils/getConfig";
  import { getConfig } from "../../utils/getConfig";

  let container: HTMLElement;
  let panoramaContainer: HTMLElement;

  let config: Config;

  let scenes: { name: string; key: number; scene: any }[] = [];
  let currentSceneKey = 1;
  let viewer: any;
  let fov = 100;

  // Update the view size when the panel is resized
  dataStore.subscribe(() => viewer && viewer.updateSize());

  function switchScene(scene: any) {
    scene.switchTo();
  }

  function findScene(sceneKey: number) {
    const scene = scenes.find((scene) => scene.key == sceneKey);
    if (!scene) throw new Error(`Found no scene with key ${sceneKey}`);

    return scenes.find((scene) => scene.key == sceneKey);
  }

  $: if (scenes.length > 0) {
    switchScene(findScene(currentSceneKey).scene);
  }

  function addHotspot(hotspot: HTMLElement) {
    const sceneIndex = hotspot.dataset.sceneIndex;

    if (!sceneIndex) {
      console.warn("Missing scene index on", hotspot);
      return;
    }

    const scene = findScene(Number(sceneIndex));

    scene.scene.hotspotContainer().createHotspot(
      hotspot,
      {
        yaw: Number(hotspot.dataset.yaw),
        pitch: Number(hotspot.dataset.pitch),
      },
      {
        perspective: {
          extraTransforms: "rotateZ(-0.5deg)",
        },
      }
    );
  }

  onMount(async () => {
    viewer = new Marzipano.Viewer(panoramaContainer);

    config = getConfig();

    if (config && config.scenes) {
      for (const sceneConfig of config.scenes) {
        const source = Marzipano.ImageUrlSource.fromString(sceneConfig.image);

        const geometry = new Marzipano.EquirectGeometry([{ width: 4096 }]);

        const limiter = Marzipano.util.compose(
          Marzipano.RectilinearView.limit.vfov(0, 3),
          Marzipano.RectilinearView.limit.hfov(0, 3),
          Marzipano.RectilinearView.limit.pitch(-Math.PI / 2, Math.PI / 2)
        );
        const view = new Marzipano.RectilinearView(
          { yaw: 0, pitch: 0, fov: (fov * Math.PI) / 180 },
          limiter
        );

        const scene = viewer.createScene({
          source: source,
          geometry: geometry,
          view: view,
          pinFirstLevel: true,
        });

        scenes = [
          ...scenes,
          {
            name: sceneConfig.scene_name,
            key: sceneConfig.scene_key,
            scene: scene,
          },
        ];
      }
    }

    panoramaContainer.addEventListener("click", (event) => {
      console.log(
        findScene(currentSceneKey)
          .scene.view()
          .screenToCoordinates({ x: event.x, y: event.y })
      );
    });
  });
</script>

<div bind:this={container}>
  <div bind:this={panoramaContainer} class="panorama-container" />
  {#if config && scenes.length > 0}
    {#each config.hotspots as hotspotConfig}
      {#if true}
        <div
          data-scene-index={hotspotConfig.scene_key}
          use:addHotspot
          data-yaw={hotspotConfig.yaw}
          data-pitch={hotspotConfig.pitch}
          data-extra-transforms={hotspotConfig.extra_transform}
        >
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
        </div>
      {/if}
    {/each}
  {/if}
</div>

<div class="scene-list">
  <ul>
    {#each scenes as sceneConfig}
      <li>
        <label class={sceneConfig.key == currentSceneKey ? "active" : ""}
          ><input
            type="radio"
            bind:group={currentSceneKey}
            value={sceneConfig.key}
          />
          {sceneConfig.name}</label
        >
      </li>
    {/each}
  </ul>
</div>

<style>
  .panorama-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .scene-list {
    position: absolute;
    top: 0;
    left: 0;
    color: #fcfcfc;
  }
  .scene-list ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .scene-list label {
    background-color: #1b191c55;
    display: block;
    padding: 10px 16px;
  }
  .scene-list label:hover {
    background-color: #1b191ce0;
  }
  .scene-list label.active {
    background-color: #1b191cbb;
  }
</style>
