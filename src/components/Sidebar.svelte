<script lang="ts">
  import DraggableHorizontally from "./DraggableHorizontally.svelte";
  import SceneList from "./SceneList.svelte";
  import SceneEditor from "./SceneEditor.svelte";

  let width = 400;
</script>

<div class="sidebar" style={`width: ${width}px`}>
  <SceneList />
  <SceneEditor />
  <DraggableHorizontally bind:width />
</div>

<style>
  .sidebar {
    position: absolute;
    top: 0;
    left: 0;

    max-height: 100%;

    display: flex;
    flex-direction: column;
  }
</style>
