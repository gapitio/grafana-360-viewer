<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let image: string | null;

  const dispatch = createEventDispatcher<{
    newimage: { name: string; type: string; dataURLs: string };
  }>();

  const onFileSelected = (
    e: Event & {
      currentTarget: EventTarget & HTMLInputElement;
    }
  ) => {
    const file = e.currentTarget.files?.item(0);
    if (!file) throw new Error("No file selected");

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const result = e.target?.result;

      if (typeof result == "string")
        dispatch("newimage", {
          name: file.name,
          type: file.type,
          dataURLs: result,
        });
    };
  };
</script>

<div>
  <input type="file" on:change={onFileSelected} />
  {#if image}
    <img src={image} alt="Scene" crossorigin="anonymous" />
  {/if}
</div>

<style>
  input {
    width: 100%;
  }
  img {
    width: 100%;
  }
</style>
