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
    hotspotConfigStore,
  } from "../../stores";
  import { getConfig } from "../../utils/getConfig";
  import HotspotContainer from "../HotspotContainer.svelte";
  import SceneEditorContainer from "../SceneEditorContainer.svelte";
  import equal from "fast-deep-equal";

  const { editable } = customProperties;

  let container: HTMLElement;
  let panoramaContainer: HTMLElement;

  currentSceneDataStore.subscribe(
    (e) => e?.scene._viewer && e?.scene.switchTo()
  );

  // Update the view size when the panel is resized
  dataStore.subscribe(() => {
    const newConfig = getConfig();
    if (!equal($configStore, newConfig)) {
      configStore.set(newConfig);
    }

    $viewerStore && $viewerStore.updateSize();
    currentSceneKeyStore.updateKey();
  });

  onMount(async () => {
    viewerStore.set(new Marzipano.Viewer(panoramaContainer));

    panoramaContainer.addEventListener("click", (event) => {
      const { x: offsetX, y: offsetY } = $viewerStore
        .domElement()
        .getBoundingClientRect();

      const x = event.x - offsetX;
      const y = event.y - offsetY;

      console.info(
        "Mouse position",
        $viewerStore.scene().view().screenToCoordinates({ x, y })
      );
    });
  });
</script>

<div bind:this={container}>
  <div bind:this={panoramaContainer} class="panorama-container" />
  {#if $hotspotConfigStore && $sceneDataListStore.length > 0}
    <HotspotContainer
      viewer={$viewerStore}
      currentSceneKey={$currentSceneKeyStore}
      hotspotConfigList={$hotspotConfigStore}
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
