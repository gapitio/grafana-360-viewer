<script lang="ts">
  import type { SceneConfig } from "../utils/getConfig";
  import NumberInput from "./Inputs/NumberInput.svelte";
  import TextInput from "./Inputs/TextInput.svelte";

  export let sceneConfigList: SceneConfig[];
  export let currentSceneKey: number;

  let currentScene = getCurrentScene();
  let image = currentScene.image;

  $: if (currentSceneKey && sceneConfigList) {
    currentScene = getCurrentScene();
    image = currentScene.image;
  }

  function getCurrentScene() {
    return sceneConfigList[
      sceneConfigList.findIndex((scene) => scene.scene_key == currentSceneKey)
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
        sceneConfigList = [...sceneConfigList];
      } else console.warn("Image is not a string");
    };
  };
</script>

<div class="container">
  <TextInput bind:value={currentScene.scene_name}>Scene name</TextInput>
  <NumberInput bind:value={currentScene.area_key}>Area key</NumberInput>
  <NumberInput bind:value={currentScene.scene_key}>Scene key</NumberInput>
  <NumberInput bind:value={currentScene.facing_pitch}>Facing pitch</NumberInput>
  <NumberInput bind:value={currentScene.facing_yaw}>Facing yaw</NumberInput>
  <NumberInput bind:value={currentScene.fov}>FOV</NumberInput>
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
