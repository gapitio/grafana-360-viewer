<script lang="ts">
  import equal from "fast-deep-equal";

  import {
    configStore,
    sceneEditsStore,
    currentSceneKeyStore,
    sceneConfigListEditsStore,
  } from "../stores";
  import type { SceneConfig } from "../utils/getConfig";

  import NumberInput from "./Inputs/NumberInput.svelte";
  import TextInput from "./Inputs/TextInput.svelte";

  $: currentSceneKey = $sceneConfigListEditsStore.findIndex(
    (scene) => scene.scene_key == $currentSceneKeyStore
  );

  let sceneConfig = getSceneConfig(
    $sceneConfigListEditsStore,
    $currentSceneKeyStore
  );

  currentSceneKeyStore.subscribe(
    (sceneKey) =>
      (sceneConfig = getSceneConfig($sceneConfigListEditsStore, sceneKey))
  );

  sceneConfigListEditsStore.subscribe(
    (config) => (sceneConfig = getSceneConfig(config, $currentSceneKeyStore))
  );

  function getSceneConfig(config: SceneConfig[], sceneKey: number) {
    return {
      ...config.find((scene) => scene.scene_key == sceneKey),
      ...($sceneEditsStore[sceneKey] ?? {}),
    };
  }

  $: {
    const uneditedSceneConfig = $configStore.scenes[currentSceneKey];

    console.log(sceneConfig, uneditedSceneConfig, $sceneConfigListEditsStore);

    if (!equal(sceneConfig, uneditedSceneConfig)) {
      const edits = {};
      for (const key of Object.keys(sceneConfig)) {
        if (!(sceneConfig[key] === uneditedSceneConfig[key])) {
          edits[key] = sceneConfig[key];
        }
      }
      sceneEditsStore.update((e) => {
        e[sceneConfig.scene_key] = edits;
        return e;
      });
    } else if ($sceneEditsStore[sceneConfig.scene_key]) {
      $sceneEditsStore =
        delete $sceneEditsStore[sceneConfig.scene_key] && $sceneEditsStore;
    }
  }

  $: console.log(11111, sceneConfig, $currentSceneKeyStore, $sceneEditsStore);
</script>

<div class="container">
  <TextInput bind:value={sceneConfig.scene_name}>Scene name</TextInput>
  <NumberInput bind:value={sceneConfig.area_key}>Area key</NumberInput>
  <NumberInput bind:value={sceneConfig.scene_key}>Scene key</NumberInput>
  <NumberInput bind:value={sceneConfig.facing_pitch}>Facing pitch</NumberInput>
  <NumberInput bind:value={sceneConfig.facing_yaw}>Facing yaw</NumberInput>
  <NumberInput bind:value={sceneConfig.fov}>FOV</NumberInput>
</div>

<style>
  .container {
    border-top: 2px solid black;
    padding: 8px 8px 4px 8px;
    background-color: #1b191c55;
  }
</style>
