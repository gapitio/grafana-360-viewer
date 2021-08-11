<script lang="ts">
  import SceneEditor from "../Editors/SceneEditor.svelte";

  import { currentSceneKeyStore } from "../../stores";
  import { getFileURL } from "../../utils/apiPath";

  import type { SceneConfig } from "../../utils/getConfig";

  export let sceneConfig: SceneConfig;
  export let selectedScene: number;
</script>

<li>
  <label class={sceneConfig.scene_key == selectedScene ? "active" : ""}>
    <input
      type="radio"
      bind:group={selectedScene}
      value={sceneConfig.scene_key}
      on:change={() => currentSceneKeyStore.setVariable(sceneConfig.scene_key)}
    />
    ({sceneConfig.scene_key})
    {sceneConfig.scene_name}
    <img src={getFileURL(sceneConfig.file_id)} alt="Scene" />
  </label>
  {#if sceneConfig.scene_key == selectedScene}
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
  img {
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
  }
</style>
