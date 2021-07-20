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

  let sceneConfigList = $configStore.scenes;
  let scenes: SceneData[] = [];

  sceneDataListStore.subscribe((e) => console.log(111111111, e));
  currentSceneDataStore.subscribe((e) => console.log(2222222, e?.name));

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

  function switchScene(scene: any) {
    scene.switchTo();
  }

  function findScene(sceneKey: number) {
    const scene = scenes.find((scene) => scene.key === sceneKey);

    if (!scene) throw new Error(`Found no scene with key ${sceneKey}`);

    return scenes.find((scene) => scene.key == sceneKey);
  }

  $: if (scenes.length > 0) {
    switchScene(findScene($currentSceneKeyStore).scene);
  }

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
        findScene($currentSceneKeyStore)
          .scene.view()
          .screenToCoordinates({ x, y })
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
      {scenes}
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
