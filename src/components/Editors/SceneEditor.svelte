<script lang="ts">
  import equal from "fast-deep-equal";
  import { get } from "svelte/store";

  import {
    configStore,
    sceneEditsStore,
    sceneConfigListEditsStore,
    currentSceneKeyStore,
  } from "../../stores";
  import { getFileURL, getFullAPIPath } from "../../utils/apiPath";
  import type { SceneConfig } from "../../utils/getConfig";
  import { update } from "../../utils/update";
  import DeleteButton from "../DeleteButton.svelte";

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

    if (uneditedSceneConfig && !equal(sceneConfig, uneditedSceneConfig)) {
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

  function onNewImage(
    event: CustomEvent<{ name: string; type: string; dataURLs: string }>
  ) {
    const {
      api: { token },
    } = customProperties;

    const { name, type, dataURLs } = event.detail;
    const [, base64] = dataURLs.split(",");

    const url = new URL(`${getFullAPIPath()}rpc/update_file`);
    fetch(url.href, {
      method: "POST",
      body: JSON.stringify([
        { file_id: sceneConfig.file_id, name, type, base64 },
      ]),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Prefer: "return=representation",
        mode: "no-cors",
      },
    })
      .then(() => configStore.set(get(configStore)))
      .catch((err) => console.error(err));
  }

  function deleteFunc() {
    const {
      api: { token },
    } = customProperties;

    const url = new URL(
      `${getFullAPIPath()}scenes?scene_key=eq.${sceneConfig.scene_key}`
    );
    fetch(url.href, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Prefer: "return=representation",
        mode: "no-cors",
      },
    })
      .then(() => {
        const { scenes } = $configStore;
        let sceneKey = null;

        if (scenes.length > currentSceneIndex + 1)
          sceneKey = scenes[currentSceneIndex + 1].scene_key;
        else if (scenes.length > 2)
          sceneKey = scenes[currentSceneIndex - 1].scene_key;

        currentSceneKeyStore.setVariable(sceneKey);
      })
      .catch((err) => console.error(err));
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
  <ImageInput bind:image on:newimage={onNewImage} />
  <DeleteButton {deleteFunc} />
</div>

<style>
  .container {
    color: #fcfcfc;
    border-bottom: 2px solid black;
    padding: 8px 8px 4px 8px;
  }
</style>
