<script lang="ts">
  import DraggableHorizontally from "../DraggableHorizontally.svelte";
  import SaveButton from "../SaveButton.svelte";
  import Tabs from "../Tabs.svelte";
  import SceneTab from "./SidebarTabs/SceneTab.svelte";
  import AreaTab from "./SidebarTabs/AreaTab.svelte";
  import HotspotTab from "./SidebarTabs/HotspotTab.svelte";

  let width = 400;
</script>

<div class="sidebar" style={`width: ${width}px`}>
  <DraggableHorizontally bind:width />
  <Tabs
    tabs={[
      { label: "Areas", component: AreaTab },
      { label: "Scenes", component: SceneTab },
      { label: "Hotspots", component: HotspotTab },
    ]}
    initSelectedNr={1}
  />
  <SaveButton />
</div>

<style>
  .sidebar {
    position: absolute;
    top: 0;
    left: 0;

    max-height: 100%;

    display: flex;
    flex-direction: column;
    background-color: #1b191c55;
  }
</style>
