<script lang="ts">
  import EditableSceneList from "./EditableSceneList.svelte";
  import SceneEditor from "./SceneEditor.svelte";
  import type { SceneConfig } from "../utils/getConfig";
  import DraggableHorizontally from "./DraggableHorizontally.svelte";

  export let sceneConfigList: SceneConfig[];
  export let currentSceneKey: number;

  let width = 400;
</script>

<div class="scene-container" style={`width: ${width}px`}>
  <EditableSceneList bind:sceneConfigList bind:currentSceneKey />
  <SceneEditor bind:sceneConfigList {currentSceneKey} />
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
