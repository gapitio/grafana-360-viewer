<script lang="ts">
  import { currentAreaKeyStore } from "../stores";
  import { headers } from "../utils/apiHeaders";
  import { getFileURL, getFullAPIPath } from "../utils/apiPath";
  import { update } from "../utils/update";

  import ImageInput from "./Inputs/ImageInput.svelte";
  import NumberInput from "./Inputs/NumberInput.svelte";
  import TextInput from "./Inputs/TextInput.svelte";

  let sceneConfig = {
    area_key: $currentAreaKeyStore,
    scene_name: "New scene",
    facing_pitch: 0,
    facing_yaw: 0,
    fov: 100,
    file_id: null,
  };

  $: image = sceneConfig.file_id && getFileURL(sceneConfig.file_id);

  function createNewImage(
    event: CustomEvent<{ name: string; type: string; dataURLs: string }>
  ) {
    const { name, type, dataURLs } = event.detail;
    const [, base64] = dataURLs.split(",");

    const url = new URL(`${getFullAPIPath()}rpc/insert_file`);
    fetch(url.href, {
      method: "POST",
      body: JSON.stringify([{ name, type, base64 }]),
      headers,
    })
      .then((res) =>
        res.text().then((data) => (sceneConfig.file_id = Number(data)))
      )
      .catch((err) => console.error(err));
  }

  function createNewScene() {
    const url = new URL(`${getFullAPIPath()}scenes`);
    fetch(url.href, {
      method: "POST",
      body: JSON.stringify(sceneConfig),
      headers,
    })
      .then((res) =>
        res.json().then(([data]) => {
          console.info("Created scene:", data);
          update();
        })
      )
      .catch((err) => console.error(err));
  }
</script>

<div>
  <TextInput bind:value={sceneConfig.scene_name}>Scene name</TextInput>
  <NumberInput bind:value={sceneConfig.facing_pitch} step={0.1}
    >Facing pitch</NumberInput
  >
  <NumberInput bind:value={sceneConfig.facing_yaw} step={0.1}
    >Facing yaw</NumberInput
  >
  <NumberInput bind:value={sceneConfig.fov}>FOV</NumberInput>
  <NumberInput bind:value={sceneConfig.file_id} min={1}>File ID</NumberInput>
  <ImageInput bind:image on:newimage={createNewImage} />
  <button on:click={createNewScene}>Create new scene</button>
</div>

<style>
  div {
    color: #fcfcfc;
    border-top: 2px solid black;
  }
  button {
    width: 100%;
  }
</style>
