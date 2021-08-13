<script lang="ts">
  import SceneList from "../../List/SceneList.svelte";
  import { getFullAPIPath } from "../../../utils/apiPath";
  import { update } from "../../../utils/update";
  import NewScene from "../../NewScene.svelte";
  import SaveButton from "../../SaveButton.svelte";
  import { sceneEditsStore } from "../../../stores";
  import { headers } from "../../../utils/apiHeaders";

  async function saveFunc() {
    Promise.all(
      Object.entries($sceneEditsStore).map(async ([sceneKey, sceneConfig]) => {
        const url = new URL(`${getFullAPIPath()}scenes`);
        url.searchParams.append("scene_key", `eq.${sceneKey}`);

        try {
          return fetch(url.href, {
            method: "PATCH",
            body: JSON.stringify(sceneConfig),
            headers,
          });
        } catch (err) {
          return console.error(err);
        }
      })
    ).then(() => update());
  }
</script>

<SceneList />
<NewScene />
<SaveButton {saveFunc} />
