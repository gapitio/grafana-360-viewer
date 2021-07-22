<script lang="ts">
  import SceneList from "./SceneList.svelte";
  import SceneEditor from "./SceneEditor.svelte";
  import DraggableHorizontally from "./DraggableHorizontally.svelte";

  let width = 400;
</script>

<div class="scene-container" style={`width: ${width}px`}>
  <SceneList />
  <SceneEditor />
  <DraggableHorizontally bind:width />
</div>

<style>
  .scene-container {
    position: absolute;
    top: 0;
    left: 0;

    max-height: 100%;

    display: flex;
    flex-direction: column;
  }
</style>
