<script lang="ts">
  import { areaEditsStore } from "../../../stores";
  import { getFullAPIPath } from "../../../utils/apiPath";
  import { update } from "../../../utils/update";

  import AreaList from "../../List/AreaList.svelte";
  import NewArea from "../../NewArea.svelte";
  import SaveButton from "../../SaveButton.svelte";

  async function saveFunc() {
    const {
      api: { token },
    } = customProperties;

    Promise.all(
      Object.entries($areaEditsStore).map(async ([areaKey, areaConfig]) => {
        const url = new URL(`${getFullAPIPath()}areas`);
        url.searchParams.append("area_key", `eq.${areaKey}`);

        try {
          return fetch(url.href, {
            method: "PATCH",
            body: JSON.stringify(areaConfig),
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

<AreaList />
<NewArea />
<SaveButton {saveFunc} />
