<script lang="ts">
  import DraggableHorizontally from "../DraggableHorizontally.svelte";
  import Tabs from "../Tabs.svelte";
  import SceneTab from "./SidebarTabs/SceneTab.svelte";
  import AreaTab from "./SidebarTabs/AreaTab.svelte";
  import HotspotTab from "./SidebarTabs/HotspotTab.svelte";
  import {
    areaConfigListStore,
    currentEditableHotspotStore,
    currentTabStore,
    hotspotConfigListStore,
    sceneDataListStore,
  } from "~/stores";

  let width = 400;
  let sceneLength: number;

  $: areaLength = $areaConfigListStore.length;
  $: $sceneDataListStore.then(({ length }) => (sceneLength = length));
  $: hotspotLength = $hotspotConfigListStore.length;

  $: if ($currentEditableHotspotStore !== null) $currentTabStore = 2;
</script>

<div class="sidebar" style={`width: ${width}px`}>
  <DraggableHorizontally bind:width />
  <Tabs
    tabs={[
      { label: `Areas (${areaLength})`, component: AreaTab },
      { label: `Scenes (${sceneLength})`, component: SceneTab },
      { label: `Hotspots (${hotspotLength})`, component: HotspotTab },
    ]}
    bind:currentTab={$currentTabStore}
  />
</div>

<style>
  .sidebar {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;

    display: flex;
    flex-direction: column;
    background-color: #1b191c55;

    border-right: 2px solid black;
  }
</style>
