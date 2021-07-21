<script lang="ts">
  import { onMount } from "svelte";
  import Marzipano from "marzipano";
  import {
    sceneDataListStore,
    viewerStore,
    currentSceneKeyStore,
    dataStore,
    configStore,
    currentSceneDataStore,
  } from "../../stores";
  import { getConfig } from "../../utils/getConfig";
  import { getSceneDataList } from "../../utils/getSceneDataList";
  import type { SceneData } from "../../utils/getSceneDataList";
  import HotspotContainer from "../HotspotContainer.svelte";
  import SceneEditorContainer from "../SceneEditorContainer.svelte";
  import equal from "fast-deep-equal";

  const { editable } = customProperties;

  let container: HTMLElement;
  let panoramaContainer: HTMLElement;

  let scenes: SceneData[] = [];

  // sceneDataListStore.subscribe((e) => console.log(111111111, e));
  currentSceneDataStore.subscribe((e) => e?.scene.switchTo());

  // Update the view size when the panel is resized
  dataStore.subscribe(() => {
    const newConfig = getConfig();

    if (!equal($configStore, newConfig)) {
      configStore.set(newConfig);
      scenes = getSceneDataList(newConfig, $viewerStore);
    }
    $viewerStore && $viewerStore.updateSize();
    currentSceneKeyStore.updateKey();
  });

  onMount(async () => {
    viewerStore.set(new Marzipano.Viewer(panoramaContainer));
    scenes = getSceneDataList($configStore, $viewerStore);

    panoramaContainer.addEventListener("click", (event) => {
      const { x: offsetX, y: offsetY } = $viewerStore
        .domElement()
        .getBoundingClientRect();

      const x = event.x - offsetX;
      const y = event.y - offsetY;

      console.info(
        "Mouse position",
        $currentSceneDataStore.scene.view().screenToCoordinates({ x, y })
      );
    });
  });
</script>

<div bind:this={container}>
  <div bind:this={panoramaContainer} class="panorama-container" />
  {#if $configStore && scenes.length > 0}
    <HotspotContainer
      viewer={$viewerStore}
      currentSceneKey={$currentSceneKeyStore}
      scenes={$sceneDataListStore}
      hotspotConfigList={$configStore.hotspots}
    />
  {/if}
</div>

{#if editable}
  <SceneEditorContainer />
{/if}

<style>
  .panorama-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
