<script lang="ts">
  import { get } from "svelte/store";

  import {
    sceneConfigListEditsStore,
    currentSceneKeyStore,
    sceneEditsStore,
    configStore,
  } from "../../stores";
  import { getFullAPIPath } from "../../utils/apiPath";
  import { update } from "../../utils/update";
  import NewScene from "../NewScene.svelte";
  import SaveButton from "../SaveButton.svelte";
  import SceneItem from "./SceneItem.svelte";

  $: selectedScene = $sceneConfigListEditsStore.find(
    (sceneConfig) => sceneConfig.scene_key == $currentSceneKeyStore
  )
    ? $currentSceneKeyStore
    : null;

  async function saveFunc() {
    const {
      api: { token },
    } = customProperties;
    for (const [sceneKey, sceneConfig] of Object.entries($sceneEditsStore)) {
      const url = new URL(`${getFullAPIPath()}scenes`);
      url.searchParams.append("scene_key", `eq.${sceneKey}`);
      fetch(url.href, {
        method: "PATCH",
        body: JSON.stringify(sceneConfig),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Prefer: "return=representation",
        },
      }).catch((err) => console.error(err));
    }

    Promise.all(
      Object.entries($sceneEditsStore).map(async ([sceneKey, sceneConfig]) => {
        const url = new URL(`${getFullAPIPath()}scenes`);
        url.searchParams.append("scene_key", `eq.${sceneKey}`);

        try {
          return fetch(url.href, {
            method: "PATCH",
            body: JSON.stringify(sceneConfig),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              Prefer: "return=representation",
            },
          });
        } catch (err) {
          return console.error(err);
        }
      })
    ).then(() => update());
  }
</script>

<div>
  <ul>
    {#each $sceneConfigListEditsStore as sceneConfig (sceneConfig.scene_key)}
      <SceneItem bind:selectedScene {sceneConfig} />
    {/each}
  </ul>
</div>

<NewScene />
<SaveButton {saveFunc} />

<style>
  div {
    color: #fcfcfc;
    overflow-y: auto;
    flex: 1;
  }
  div ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>
