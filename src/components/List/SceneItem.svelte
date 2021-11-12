<script lang="ts">
  import SceneEditor from "../Editors/SceneEditor.svelte";

  import { currentSceneKeyStore, sceneEditsStore } from "~/stores";
  import { getFileURL } from "~/utils/apiPath";

  import type { SceneConfig } from "~/utils/getConfig";

  export let sceneConfig: SceneConfig;
  export let selectedScene: number | null;

  $: isActive = sceneConfig.scene_key == selectedScene;
  $: isEdited = sceneConfig.scene_key in $sceneEditsStore;
</script>

<li>
  <label class:active={isActive} class:edited={isEdited}>
    <input
      type="radio"
      bind:group={selectedScene}
      value={sceneConfig.scene_key}
      on:change={() => currentSceneKeyStore.setVariable(sceneConfig.scene_key)}
    />
    ({sceneConfig.scene_key})
    {sceneConfig.scene_name}
    <img
      src={getFileURL(sceneConfig.file_id)}
      alt="Scene"
      crossorigin="anonymous"
    />
  </label>
  {#if isActive}
    <SceneEditor {sceneConfig} />
  {/if}
</li>

<style>
  label {
    display: block;
    padding: 10px 16px;
    height: 22px;
    position: relative;
  }
  label:hover {
    background-color: #1b191ce0;
  }
  label.active {
    background-color: #1b191cbb;
  }
  label.edited {
    font-style: italic;
  }

  img {
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
  }
</style>
