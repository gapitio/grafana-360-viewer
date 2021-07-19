<script lang="ts">
  export let value: string;
</script>

<div>
  <slot />
  <input type="text" bind:value />
</div>

<style>
  div {
    display: flex;
    justify-content: space-between;
  }
</style>
