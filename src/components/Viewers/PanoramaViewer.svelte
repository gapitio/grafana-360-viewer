<script lang="ts">
  import { onMount } from "svelte";
  import Marzipano from "marzipano";
  import {
    sceneDataListStore,
    viewerStore,
    dataStore,
    currentSceneDataStore,
    hotspotConfigListStore,
    autoRotateStore,
  } from "~/stores";
  import HotspotContainer from "../HotspotContainer.svelte";
  import { disableAutoRotation, enableAutoRotation } from "~/utils/autorotate";
  import Sidebar from "../Sidebar/Sidebar.svelte";
  import { update } from "~/utils/update";

  const { editable } = customProperties;

  let container: HTMLElement;
  let panoramaContainer: HTMLElement;

  currentSceneDataStore.subscribe(async (e) => {
    const sceneData = await e;
    sceneData?.scene?._viewer && sceneData.scene.switchTo();
  });

  dataStore.subscribe(update);

  $: if ($viewerStore) {
    if ($autoRotateStore == "False") {
      disableAutoRotation($viewerStore);
    } else {
      enableAutoRotation($viewerStore);
    }
  }

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
  {#await $sceneDataListStore then sceneDataList}
    {#await $hotspotConfigListStore then hotspotConfigList}
      {#if $hotspotConfigListStore && sceneDataList.length > 0}
        <HotspotContainer {hotspotConfigList} {sceneDataList} />
      {/if}
    {/await}
  {/await}
</div>

{#if editable}
  <Sidebar />
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
