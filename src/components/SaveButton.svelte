<script lang="ts">
  import { getFullAPIPath } from "../utils/apiPath";

  const {
    database: { apiKey },
  } = customProperties;

  async function save() {
    console.log(2);
    const url = new URL(`${getFullAPIPath()}scenes`);
    const res = await fetch(url.href, {
      method: "POST",
      body: JSON.stringify([{ scene_name: "a", area_key: 1 }]),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        Prefer: "return=representation",
      },
    });

    const data = await res.json();

    console.log(data, res);
  }
</script>

<button on:click={save}>Save</button>

<style>
</style>
