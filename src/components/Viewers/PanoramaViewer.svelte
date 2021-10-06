<script lang="ts">
  import { onMount } from "svelte";
  import Marzipano from "marzipano";
  import {
    sceneDataListStore,
    viewerStore,
    dataStore,
    currentSceneDataStore,
    hotspotConfigListStore,
  } from "~/stores";
  import HotspotContainer from "../Hotspots/HotspotContainer.svelte";
  import Sidebar from "../Sidebar/Sidebar.svelte";
  import { update } from "~/utils/update";
  import { autoRotate } from "~/utils/autorotate";
  import {
    logMouseCoordinates,
    updateMouseCoordinates,
  } from "~/utils/mouseCoordinates";
  import DevInfo from "../DevInfo/DevInfo.svelte";

  const { editable } = customProperties;

  let panoramaContainer: HTMLElement;

  currentSceneDataStore.subscribe(async (e) => {
    const sceneData = await e;
    sceneData?.scene?._viewer && sceneData.scene.switchTo();
  });

  dataStore.subscribe(update);
  autoRotate();

  onMount(() => viewerStore.set(new Marzipano.Viewer(panoramaContainer)));
</script>

<div on:mousemove={updateMouseCoordinates}>
  <div>
    <div
      bind:this={panoramaContainer}
      on:click={logMouseCoordinates}
      class="panorama-container"
    />
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
    <DevInfo />
  {/if}
</div>

<style>
  .panorama-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
