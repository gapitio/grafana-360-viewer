<script lang="ts">
  import { hotspotEditsStore, newHotspotStore } from "../../../stores";
  import { getFullAPIPath } from "../../../utils/apiPath";
  import { update } from "../../../utils/update";

  import NewHotspot from "../../NewHotspot.svelte";
  import SaveButton from "../../SaveButton.svelte";

  async function saveNewHotspots(token: string) {
    const url = new URL(`${getFullAPIPath()}hotspots`);
    await fetch(url.href, {
      method: "POST",
      body: JSON.stringify($newHotspotStore),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Prefer: "return=representation",
      },
    })
      .then((res) =>
        res.json().then(([data]) => {
          console.info("Created scene:", data);
          update();
        })
      )
      .catch((err) => console.error(err));

    newHotspotStore.set([]);
  }

  async function saveFunc() {
    const {
      api: { token },
    } = customProperties;

    await saveNewHotspots(token);

    Promise.all(
      Object.entries($hotspotEditsStore).map(
        async ([hotspotKey, hotspotConfig]) => {
          const url = new URL(`${getFullAPIPath()}hotspots`);
          url.searchParams.append("hotspot_key", `eq.${hotspotKey}`);

          try {
            return fetch(url.href, {
              method: "PATCH",
              body: JSON.stringify(hotspotConfig),
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                Prefer: "return=representation",
              },
            });
          } catch (err) {
            return console.error(err);
          }
        }
      )
    ).then(() => update());
  }
</script>

<NewHotspot />
<SaveButton {saveFunc} />
