<script lang="ts">
  import equal from "fast-deep-equal";
  import { get } from "svelte/store";

  import DeleteButton from "../DeleteButton.svelte";
  import ImageInput from "../Inputs/ImageInput.svelte";
  import NumberInput from "../Inputs/NumberInput.svelte";
  import TextInput from "../Inputs/TextInput.svelte";

  import {
    configStore,
    sceneEditsStore,
    sceneConfigListEditsStore,
    currentSceneKeyStore,
    uneditedSceneConfigListStore,
  } from "../../stores";
  import { getFileURL, getFullAPIPath } from "../../utils/apiPath";

  import type { SceneConfig } from "../../utils/getConfig";

  export let sceneConfig: SceneConfig;

  const {
    api: { authorizationHeader },
  } = customProperties;

  $: image = getFileURL(sceneConfig.file_id);

  $: currentSceneIndex = $sceneConfigListEditsStore.findIndex(
    (scene) => scene.scene_key == sceneConfig.scene_key
  );

  $: {
    const uneditedSceneConfig =
      $uneditedSceneConfigListStore[currentSceneIndex];

    if (!equal(sceneConfig, uneditedSceneConfig)) {
      const edits = Object.fromEntries(
        Object.keys(sceneConfig)
          .filter((key) => sceneConfig[key] !== uneditedSceneConfig[key])
          .map((key) => [key, sceneConfig[key]])
      );

      const sceneConfigEdits = $sceneEditsStore[sceneConfig.scene_key];
      if (!equal(sceneConfigEdits, edits))
        sceneEditsStore.update((e) => ({
          ...e,
          ...{ [sceneConfig.scene_key]: edits },
        }));
    } else if ($sceneEditsStore[sceneConfig.scene_key])
      $sceneEditsStore =
        delete $sceneEditsStore[sceneConfig.scene_key] && $sceneEditsStore;
  }

  function onNewImage(
    event: CustomEvent<{ name: string; type: string; dataURLs: string }>
  ) {
    const { name, type, dataURLs } = event.detail;
    const [, base64] = dataURLs.split(",");

    const url = new URL(`${getFullAPIPath()}rpc/insert_file`);
    fetch(url.href, {
      method: "POST",
      body: JSON.stringify([{ name, type, base64 }]),
      headers: {
        "Content-Type": "application/json",
        ...authorizationHeader,
        Prefer: "return=representation",
      },
    })
      .then((res) =>
        res.text().then((data) => (sceneConfig.file_id = Number(data)))
      )
      .catch((err) => console.error(err));
  }

  function deleteFunc() {
    const url = new URL(`${getFullAPIPath()}scenes`);
    url.searchParams.append("scene_key", `eq.${sceneConfig.scene_key}`);
    fetch(url.href, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...authorizationHeader,
        Prefer: "return=representation",
      },
    })
      .then(() => {
        const scenes = $uneditedSceneConfigListStore;
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
  <NumberInput bind:value={sceneConfig.facing_pitch} step={0.1}>
    Facing pitch
  </NumberInput>
  <NumberInput bind:value={sceneConfig.facing_yaw} step={0.1}>
    Facing yaw
  </NumberInput>
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
