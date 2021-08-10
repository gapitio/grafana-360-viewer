<script lang="ts">
  import equal from "fast-deep-equal";

  import {
    configStore,
    sceneEditsStore,
    sceneConfigListEditsStore,
  } from "../../stores";
  import { getFileURL } from "../../utils/apiPath";
  import type { SceneConfig } from "../../utils/getConfig";
  import ImageInput from "../Inputs/ImageInput.svelte";

  import NumberInput from "../Inputs/NumberInput.svelte";
  import TextInput from "../Inputs/TextInput.svelte";

  export let sceneConfig: SceneConfig;

  $: image = getFileURL(sceneConfig.file_id);

  $: currentSceneIndex = $sceneConfigListEditsStore.findIndex(
    (scene) => scene.scene_key == sceneConfig.scene_key
  );

  $: {
    const uneditedSceneConfig = $configStore.scenes[currentSceneIndex];

    if (!equal(sceneConfig, uneditedSceneConfig)) {
      const edits = {};
      for (const key of Object.keys(sceneConfig)) {
        if (!(sceneConfig[key] === uneditedSceneConfig[key])) {
          edits[key] = sceneConfig[key];
        }
      }

      const sceneConfigEdits = $sceneEditsStore[sceneConfig.scene_key];
      if (!equal(sceneConfigEdits, edits))
        sceneEditsStore.update((e) => ({
          ...e,
          ...{ [sceneConfig.scene_key]: edits },
        }));
    } else if ($sceneEditsStore[sceneConfig.scene_key]) {
      $sceneEditsStore =
        delete $sceneEditsStore[sceneConfig.scene_key] && $sceneEditsStore;
    }
  }
</script>

<div class="container">
  <TextInput bind:value={sceneConfig.scene_name}>Scene name</TextInput>
  <NumberInput bind:value={sceneConfig.area_key} min={1}>Area key</NumberInput>
  <NumberInput bind:value={sceneConfig.scene_key} min={1}>Scene key</NumberInput
  >
  <NumberInput bind:value={sceneConfig.facing_pitch} step={0.1}
    >Facing pitch</NumberInput
  >
  <NumberInput bind:value={sceneConfig.facing_yaw} step={0.1}
    >Facing yaw</NumberInput
  >
  <NumberInput bind:value={sceneConfig.fov}>FOV</NumberInput>
  <NumberInput bind:value={sceneConfig.file_id} min={1}>File ID</NumberInput>
  <ImageInput bind:image />
</div>

<style>
  .container {
    color: #fcfcfc;
    border-bottom: 2px solid black;
    padding: 8px 8px 4px 8px;
  }
</style>
