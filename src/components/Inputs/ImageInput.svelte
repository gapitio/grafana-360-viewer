<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let image: string;

  const dispatch = createEventDispatcher<{
    newimage: { name: string; type: string; dataURLs: string };
  }>();

  const onFileSelected = (
    e: Event & {
      currentTarget: EventTarget & HTMLInputElement;
    }
  ) => {
    const file = e.currentTarget.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const result = e.target.result;

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
  <img src={image} alt="Scene" />
</div>

<style>
  input {
    margin-left: 10px;
    width: 150px;
  }

  img {
    width: 100%;
  }
</style>
