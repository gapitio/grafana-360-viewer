<script lang="ts">
  import { getFullAPIPath } from "~/utils/apiPath";
  import { update } from "~/utils/update";
  import { sceneEditsStore } from "~/stores";
  import { headers } from "~/utils/apiHeaders";

  import NewScene from "../../New/NewScene.svelte";
  import SaveButton from "../../SaveButton.svelte";
  import SceneList from "../../List/SceneList.svelte";

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
