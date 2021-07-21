<script lang="ts">
  import equal from "fast-deep-equal";

  import {
    configStore,
    sceneEditsStore,
    currentSceneKeyStore,
  } from "../stores";

  import NumberInput from "./Inputs/NumberInput.svelte";
  import TextInput from "./Inputs/TextInput.svelte";

  let sceneConfig = {
    ...$configStore.scenes.find(
      (scene) => scene.scene_key == $currentSceneKeyStore
    ),
  };

  let initSceneConfig = { ...sceneConfig };

  let currentScene = getCurrentScene();
  let image = currentScene.image;

  $: {
    const sceneConfigStore = $configStore.scenes.find(
      (scene) => scene.scene_key == $currentSceneKeyStore
    );

    if (!equal(sceneConfig, initSceneConfig)) {
      const edits = {};
      for (const key of Object.keys(sceneConfig)) {
        if (!(sceneConfig[key] === initSceneConfig[key])) {
          edits[key] = sceneConfig[key];
        }
      }
      sceneEditsStore.update((e) => (e[sceneConfig.scene_key] = edits));
    }
  }

  $: console.log(22222, $sceneEditsStore);
  $: console.log(11111, sceneConfig, $currentSceneKeyStore);

  $: if ($currentSceneKeyStore && $configStore) {
    currentScene = getCurrentScene();
    image = currentScene.image;
  }

  function getCurrentScene() {
    return $configStore.scenes[
      $configStore.scenes.findIndex(
        (scene) => scene.scene_key == $currentSceneKeyStore
      )
    ];
  }

  const onFileSelected = (
    e: Event & {
      currentTarget: EventTarget & HTMLInputElement;
    }
  ) => {
    const imageData = e.currentTarget.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(imageData);
    reader.onload = (e) => {
      if (typeof e.target.result == "string") {
        image = e.target.result;
        currentScene.image = image;
        $configStore.scenes = [...$configStore.scenes];
      } else console.warn("Image is not a string");
    };
  };
</script>

<div class="container">
  <TextInput bind:value={sceneConfig.scene_name}>Scene name</TextInput>
  <NumberInput bind:value={sceneConfig.area_key}>Area key</NumberInput>
  <NumberInput bind:value={sceneConfig.scene_key}>Scene key</NumberInput>
  <NumberInput bind:value={sceneConfig.facing_pitch}>Facing pitch</NumberInput>
  <NumberInput bind:value={sceneConfig.facing_yaw}>Facing yaw</NumberInput>
  <NumberInput bind:value={sceneConfig.fov}>FOV</NumberInput>
  <input type="file" on:change={onFileSelected} />
  <img src={image} alt="" />
</div>

<style>
  .container {
    border-top: 2px solid black;
    padding: 8px 8px 4px 8px;
    background-color: #1b191c55;
  }

  img {
    margin-top: 6px;
    width: 100%;
  }
</style>
