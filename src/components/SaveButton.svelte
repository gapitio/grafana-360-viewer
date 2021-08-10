<script lang="ts">
  import { getFullAPIPath } from "../utils/apiPath";

  async function save() {
    const url = new URL(`${getFullAPIPath()}scenes`);
    const res = await fetch(url.href, {
      method: "POST",
      body: JSON.stringify([{ scene_name: "a", area_key: 1 }]),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${url}`,
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
