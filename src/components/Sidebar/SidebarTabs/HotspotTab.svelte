<script lang="ts">
  import { hotspotEditsStore, newHotspotStore } from "../../../stores";
  import { headers } from "../../../utils/apiHeaders";
  import { getFullAPIPath } from "../../../utils/apiPath";
  import type { HotspotConfig } from "../../../utils/getConfig";
  import { update } from "../../../utils/update";
  import HotspotList from "../../List/HotspotList.svelte";

  import NewHotspot from "../../NewHotspot.svelte";
  import SaveButton from "../../SaveButton.svelte";

  function updateEditHotspotKeys(keys: number[]) {
    for (const i in $newHotspotStore) {
      const oldKey = $newHotspotStore[i].hotspot_key;
      const newKey = keys[i];

      if ($hotspotEditsStore[oldKey]) {
        hotspotEditsStore.update(({ [oldKey]: h, ...rest }) => {
          return {
            [newKey]: h,
            ...rest,
          };
        });
      }
    }
  }

  async function saveNewHotspots() {
    // remove hotspot_key
    const newHotspots = $newHotspotStore.map(
      ({ hotspot_key, ...rest }) => rest
    );

    const url = new URL(`${getFullAPIPath()}hotspots`);
    await fetch(url.href, {
      method: "POST",
      body: JSON.stringify(newHotspots),
      headers,
    })
      .then((res) =>
        res.json().then((data: HotspotConfig[]) => {
          console.info("Created hotspots:", data);
          updateEditHotspotKeys(data.map((h) => Number(h.hotspot_key)));
          newHotspotStore.set([]);
          update();
        })
      )
      .catch((err) => console.error(err));
  }

  async function saveFunc() {
    await saveNewHotspots();

    Promise.all(
      Object.entries($hotspotEditsStore).map(
        async ([hotspotKey, hotspotConfig]) => {
          const url = new URL(`${getFullAPIPath()}hotspots`);
          url.searchParams.append("hotspot_key", `eq.${hotspotKey}`);

          try {
            return fetch(url.href, {
              method: "PATCH",
              body: JSON.stringify(hotspotConfig),
              headers,
            });
          } catch (err) {
            return console.error(err);
          }
        }
      )
    ).then(() => {
      hotspotEditsStore.update(() => ({}));
      update();
    });
  }
</script>

<HotspotList />
<NewHotspot />
<SaveButton {saveFunc} />
