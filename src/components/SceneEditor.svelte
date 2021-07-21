<script lang="ts">
  import {
    configStore,
    currentSceneDataStore,
    currentSceneKeyStore,
  } from "../stores";

  import NumberInput from "./Inputs/NumberInput.svelte";
  import TextInput from "./Inputs/TextInput.svelte";

  let currentScene = getCurrentScene();
  let image = currentScene.image;
  let key = $configStore.scenes.findIndex(
    (scene) => scene.scene_key == $currentSceneKeyStore
  );

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
  <TextInput bind:value={$configStore.scenes[key].scene_name}
    >Scene name</TextInput
  >
  <NumberInput bind:value={$configStore.scenes[key].area_key}
    >Area key</NumberInput
  >
  <NumberInput bind:value={$configStore.scenes[key].scene_key}
    >Scene key</NumberInput
  >
  <NumberInput bind:value={$configStore.scenes[key].facing_pitch}
    >Facing pitch</NumberInput
  >
  <NumberInput bind:value={$configStore.scenes[key].facing_yaw}
    >Facing yaw</NumberInput
  >
  <NumberInput bind:value={$configStore.scenes[key].fov}>FOV</NumberInput>
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
