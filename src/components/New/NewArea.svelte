<script lang="ts">
  import { headers } from "~/utils/apiHeaders";
  import { getFullAPIPath } from "~/utils/apiPath";
  import { update } from "~/utils/update";

  import TextInput from "../Inputs/TextInput.svelte";

  let areaConfig = {
    area_name: "New area",
  };

  function createNewArea() {
    const url = new URL(`${getFullAPIPath()}areas`);
    fetch(url.href, {
      method: "POST",
      body: JSON.stringify(areaConfig),
      headers,
    })
      .then((res) =>
        res.json().then(([data]) => {
          console.info("Created area:", data);
          update();
        })
      )
      .catch((err) => console.error(err));
  }
</script>

<div>
  <TextInput bind:value={areaConfig.area_name}>Area name</TextInput>
  <button on:click={createNewArea}>Create new area</button>
</div>

<style>
  div {
    border-top: 2px solid black;
  }
  button {
    width: 100%;
  }
</style>
