<script lang="ts">
  export let value: string | null;
</script>

<div>
  <slot />
  <input type="text" bind:value />
</div>

<style>
  div {
    display: flex;
    justify-content: space-between;
    white-space: pre;
  }

  input {
    margin-left: 10px;
    width: 150px;
  }
</style>
