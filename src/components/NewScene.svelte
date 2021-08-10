<script lang="ts">
  import { currentAreaKeyStore } from "../stores";
  import { getFileURL } from "../utils/apiPath";

  import ImageInput from "./Inputs/ImageInput.svelte";
  import NumberInput from "./Inputs/NumberInput.svelte";
  import TextInput from "./Inputs/TextInput.svelte";

  const sceneConfig = {
    areaKey: $currentAreaKeyStore,
    sceneName: "New scene",
    facingPitch: 0,
    facingYaw: 0,
    fov: 100,
    fileID: 0,
  };

  $: image = sceneConfig.fileID && getFileURL(sceneConfig.fileID);

  function onNewImage(
    event: CustomEvent<{ name: string; type: string; dataURLs: string }>
  ) {
    const {
      api: { token },
    } = customProperties;

    const { name, type, dataURLs } = event.detail;
    const [, base64] = dataURLs.split(",");

    const url = new URL(`http://localhost:3202/rpc/insert_file`);
    fetch(url.href, {
      method: "POST",
      body: JSON.stringify([{ name, type, base64 }]),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Prefer: "return=representation",
      },
    })
      .then((res) =>
        res.text().then((data) => (sceneConfig.fileID = Number(data)))
      )
      .catch((err) => console.error(err));
  }
</script>

<div>
  <TextInput bind:value={sceneConfig.sceneName}>Scene name</TextInput>
  <NumberInput bind:value={sceneConfig.facingPitch} step={0.1}
    >Facing pitch</NumberInput
  >
  <NumberInput bind:value={sceneConfig.facingYaw} step={0.1}
    >Facing yaw</NumberInput
  >
  <NumberInput bind:value={sceneConfig.fov}>FOV</NumberInput>
  <NumberInput bind:value={sceneConfig.fileID} min={1}>File ID</NumberInput>
  <ImageInput bind:image on:newimage={onNewImage} />
  <button>Create new scene</button>
</div>

<style>
  div {
    border-top: 2px solid black;
  }
  button {
    width: 100%;
  }
</style>
