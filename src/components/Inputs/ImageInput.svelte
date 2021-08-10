<script lang="ts">
  export let image: string;

  const onFileSelected = (
    e: Event & {
      currentTarget: EventTarget & HTMLInputElement;
    }
  ) => {
    const imageData = e.currentTarget.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(imageData);
    reader.onload = (e) => {
      const result = e.target.result;

      if (typeof result == "string") image = result;
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
